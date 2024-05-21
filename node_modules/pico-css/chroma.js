const per = (amt)=>amt>1?amt/100:amt;
const css_colors = {maroon:'#800000',red:'#FF0000',orange:'#FFA500',yellow:'#FFFF00',olive:'#808000',green:'#008000',purple:'#800080',fuchsia:'#FF00FF',lime:'#00FF00',teal:'#008080',aqua:'#00FFFF',blue:'#0000FF',navy:'#000080',black:'#000000',gray:'#808080',silver:'#C0C0C0',white:'#FFFFFF'};
const parse = (str)=>{
	if(typeof str == 'object') return str;
	if(css_colors[str]) return parse(css_colors[str]);
	if(str.length < 5) str = '#'+str[1]+str[1]+str[2]+str[2]+str[3]+str[3];
	const [r,g,b] = str.replace('#','').match(/..?/g).map(x=>parseInt(x,16));
	return {r,g,b,a:1};
};
const toHex =  ({r,g,b,a=1})=>{
	const hex = (val)=>Math.floor(val).toString(16).padStart(2, '0').toLowerCase();
	return '#'+hex(r)+hex(g)+hex(b)+(a!=1?hex(a*255):'');
};

const lighten = (color,amt=0.2)=>{
	let {r,g,b,a} = parse(color);
	const l=(clr)=>clr+(255-clr)*(per(amt));
	return toHex({r:l(r),g:l(g),b:l(b),a});
};
const darken = (color,amt=0.2)=>{
	let {r,g,b,a} = parse(color);
	const d=(clr)=>clr-(clr)*(per(amt));
	return toHex({r:d(r),g:d(g),b:d(b),a});
};
const fade = (color, amt=0.2)=>toHex({...parse(color), a:per(amt)});

const luminance = (color)=>{
	const { r, g, b } = parse(color);
	return (r * 299 + g * 587 + b * 114) / 255000;
};
const isDark = (color)=>luminance(color) <= 0.5;
const isBright = (color)=>luminance(color) > 0.5;

module.exports = {
	fade,
	darken,
	lighten,
	luminance,
	isDark,
	isBright,
}