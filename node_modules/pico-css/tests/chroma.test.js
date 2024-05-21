const chroma = require('../chroma.js')


module.exports = {

	luminance : (t)=>{

		t.is(chroma.luminance('white'), 1);
		t.is(chroma.luminance('black'), 0);

		t.is(chroma.luminance('yellow'), 0.886);


		t.ok(chroma.luminance('red') > chroma.luminance(chroma.darken('red', 0.2)));
		t.ok(chroma.luminance('red') < chroma.luminance(chroma.lighten('red', 0.2)));

	},
	lighten : (t)=>{

		t.is(chroma.lighten('blue', 0), '#0000ff');
		t.is(chroma.lighten('blue', 0.5), '#7f7fff');
		t.is(chroma.lighten('blue', 1), '#ffffff');
	},


	darken : (t)=>{
		t.is(chroma.darken('blue', 0), '#0000ff');
		t.is(chroma.darken('blue', 0.5), '#00007f');
		t.is(chroma.darken('blue', 1), '#000000');
	},

	isDark : (t)=>{
		t.ok(chroma.isDark('maroon'));
		t.ok(chroma.isDark('red'));
		t.ok(chroma.isDark('olive'));
		t.ok(chroma.isDark('green'));
		t.ok(chroma.isDark('purple'));
		t.ok(chroma.isDark('fuchsia'));
		t.ok(chroma.isDark('teal'));
		t.ok(chroma.isDark('blue'));
		t.ok(chroma.isDark('navy'));
		t.ok(chroma.isDark('black'));

		t.no(chroma.isDark('orange'));
		t.no(chroma.isDark('yellow'));
		t.no(chroma.isDark('lime'));
		t.no(chroma.isDark('aqua'));
		t.no(chroma.isDark('gray'));
		t.no(chroma.isDark('silver'));
		t.no(chroma.isDark('white'));
	},

	isBright : (t)=>{
		t.no(chroma.isBright('maroon'));
		t.no(chroma.isBright('red'));
		t.no(chroma.isBright('olive'));
		t.no(chroma.isBright('green'));
		t.no(chroma.isBright('purple'));
		t.no(chroma.isBright('fuchsia'));
		t.no(chroma.isBright('teal'));
		t.no(chroma.isBright('blue'));
		t.no(chroma.isBright('navy'));
		t.no(chroma.isBright('black'));

		t.ok(chroma.isBright('orange'));
		t.ok(chroma.isBright('yellow'));
		t.ok(chroma.isBright('lime'));
		t.ok(chroma.isBright('aqua'));
		t.ok(chroma.isBright('gray'));
		t.ok(chroma.isBright('silver'));
		t.ok(chroma.isBright('white'));

	},
}