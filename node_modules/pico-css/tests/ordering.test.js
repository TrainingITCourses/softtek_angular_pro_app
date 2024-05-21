const picocss = require('../pico-css.js');

const css = (input, ...vals)=>{
	return picocss.parse(picocss.tag(input, vals))
};

module.exports = {


	errors : {

		midrule : (t)=>{
			t.throws(()=>{
				const parsed = css`
					div{
						color : blue
						background-color : green;
					}
				`;
			})
		},

		cascade : (t)=>{
			t.throws(()=>{
				const parsed = css`
					div{
						color : blue;
						background-color : green;

						&:hover{
							color : red
						}
					}

					a{
						color : purple;
					}
				`;

				console.log(parsed);
			});
		}

	},

	temp : (t)=>{

		const res = css`

			input[type=text]{
				background-color: red;

			}

		`;

		//console.log(res)


	},

	_foo : ()=>{

		const res = css`

				@media print {
					a {
						pointer-events: none !important;
						text-decoration: none !important;
						color : var(--text-color) !important;
					}
				}


				h1.splotch-light, h2.splotch-light, h3.splotch-light, h1.splotch, h2.splotch, h3.splotch{
					position : relative;
					z-index : 100;
					background-repeat : no-repeat;
					background-size: contain;
					background-position: center;
					display: inline-block;
				}

				h1.splotch-light, h2.splotch-light, h3.splotch-light{
				}

				h1.splotch, h2.splotch, h3.splotch{
					padding-left : 30px;
					padding-right : 30px;

					margin-left : -30px;
					margin-right : -30px;
				}

				@media only screen and (max-width: 600px) {
					h1.splotch-light, h2.splotch-light, h3.splotch-light, h1.splotch, h2.splotch, h3.splotch{
						background: none;
					}
				}
			`;

			console.log(res)

		console.log(picocss.toString(res))

	}

}