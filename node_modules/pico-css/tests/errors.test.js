const css = require('../pico-css.js');

module.exports = {

	no_semicolon : (t)=>{
		css`
			body{
				color : red
			}
		`;

	}

}