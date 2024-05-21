const css = require('../pico-css.js');


module.exports = {

	no_root : (t)=>{
		const parsed = css`
			display : block;
			cursor : pointer;
			&:hover{
				background-color : blue;
			}
		`;


		t.is(parsed,
`	display:block;
	cursor:pointer;
&:hover{
	background-color:blue;
}`)
	},

	mixins : (t)=>{
		const button = (color='green')=>{
			return css`
				display : block;
				cursor : pointer;
				&:hover{
					background-color : ${color};
				}
			`;
		}

		const parsed = css`
			p{
				display : relative;
				margin-right : 40px;
				${button('purple')};
			}
		`;

		t.is(parsed,
`p{
	display:block;
	margin-right:40px;
	cursor:pointer;
}
p:hover{
	background-color:purple;
}`);

	}
}