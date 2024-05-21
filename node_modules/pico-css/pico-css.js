if (!String.prototype.replaceAll) String.prototype.replaceAll = function(str, newStr){ return this.replace(new RegExp(str, 'g'), newStr) };

const weave = (a1, a2)=>a2.reduce((acc,a,idx)=>acc.concat(a1[idx], a),[]).concat(a1[a1.length-1]);
const tag = (input, vals)=>(Array.isArray(input)) ? weave(input, vals).join('') : input;

const picoparse = (rules, text)=>{
	let remaining = text, result = [], skip=false, pos=0;
	while(remaining.length > 0){
		let match = rules.reduce((best, [rgx, fn])=>{
			let match = rgx.exec(remaining);
			if(!match) return best;
			if(!best || match.index < best.index){ match.func = fn; return match; }
			return best;
		}, false);
		if(!match) break;
		const [text, ...groups] = match;
		pos += match.index;
		const res = match.func(groups, {text, pos, pre:remaining.substring(0,match.index)})
		if(typeof res == 'boolean'){ skip = res; }
		else if(!skip && res){ result.push(res); }
		remaining = remaining.substring(match.index + text.length);
	}
	return result;
};

const convertKeys = (keys)=>{
	let media;
	return {
		sel : keys.reduce((acc,key)=>{
			if(key.startsWith('@media')){
				media=key;
				return acc;
			}
			return acc.flatMap(sublist=>key.split(',').map(subkey=>sublist.concat(subkey.trim())))
		},[[]])
			.map(arr=>arr.join(' ').replaceAll(' &', '').replaceAll(' :', ':'))
			.join(','),
		media
	}
};

const parse = (str)=>{
	const parsed = picoparse([
		[/\/\*(\*(?!\/)|[^*])*\*\//, ()=>null],
		[/\s*\/\/.*/,                ()=>null],
		[/([^{};\s][^{};]*){/,       ([selector])=>['selc', selector.trim()]],
		[/([\w+-]+)\s*:\s*([^;]+);/, ([key, val])=>['rule', key, val]],
		[/}/,                        ()=>['close']],
	], str);

	let keys = [];
	return parsed.reduce((acc,[type, key, val])=>{
		if(type=='selc') keys.push(key);
		if(type=='close') keys.pop();
		if(type=='rule'){
			const {sel, media} = convertKeys(keys);
			const last = acc[acc.length-1]||{};
			if(sel!=last.sel || media!=last.media){
				acc.push({sel,media,rules:{}});
			}
			if(val.indexOf('}')!==-1||val.indexOf(':')!==-1) throw new Error(`ERR: CSS parsing error near: ${sel} -> ${key}`);
			acc[acc.length-1].rules[key] = val;
		}
		return acc;
	}, [])
};

const toString = (selectorList)=>{
	return selectorList.map(({sel, media, rules})=>{
		let res = [], buf=media?'\t':'';
		if(media) res.push(media+'{');
		if(sel) res.push(buf+sel+'{');
		Object.entries(rules).map(([k,v])=>res.push(`${buf}\t${k}:${v};`))
		if(sel) res.push(buf+'}');
		if(media) res.push('}');
		return res.join('\n')
	}).join('\n')
}

const css = (input, ...vals)=>toString(parse(tag(input, vals)));

css.parse    = parse;
css.tag      = tag;
css.toString = toString;
css.inject   = (input, ...vals)=>document.head.insertAdjacentHTML('beforeend', `<style>${css(input, ...vals)}</style>`);

module.exports = css;