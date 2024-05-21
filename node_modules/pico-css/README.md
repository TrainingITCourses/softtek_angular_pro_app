# 🎨 pico-css
A micro css preprocessor written in JS for JS. Under 100 lines. Supports nesting, mixins, parent selectors, and injectable values. Also comes with a tiny color manipulation utility.

[![npm version](https://badge.fury.io/js/pico-css.svg)](https://badge.fury.io/js/pico-css)


### install

```bash
npm install pico-css
```

### usage

```js
const css = require('pico-css');
const {lighten} = require('pico-css/chroma.js');

const btn = (color)=>{
  return css`
    cursor : pointer;
    background-color: ${color};
    &:hover{
      background-color: ${lighten(color, 0.2)};
    }
  `
}

css`
  body{
    margin-top : 20px;
    button{
      font-size : 2em;
      ${btn('#dabb1e')}
    }
  }
`;

// Converts to -->
`body{
  margin-top: 20px;
}
body button{
  font-size: 2em;
  cursor: pointer;
  background-color: #dabb1e;
}
body button:hover{
  background-color: #e1c84b;
}
`
```


## why?
CSS preprocessors like Less and Sass, are very powerful, but require you to learn a new sub-language and any business logic would need to be duplicated between rendering and styling.

They also provide _way more features_ then is typically needed, and can lead to weird footguns and overly designed style systems. `pico-css` is just a simple lib for convert nested css into valid css while leveraging JS for variables and logic.



## chroma
`pico-css` also ships with a little color manipulation utility called chroma. [Docs here]().

```js
const css = require('pico-css');
const {lighten, isDark, fade} = require('pico-css/chroma');


//Adaptive text color to ensure high contrast for readability
const textColor = (color)=>isDark(color) ? 'white' : 'black';

const btnColor = 'blue';

css`
button{
  color : ${textColor(btnColor)};
  background-color: ${btnColor}
  &:hover{
    background-color: ${lighten(btnColor, 0.2)};
  }
}`
```



## features
`pico-css` comes with most of the useful features of css pre-processor with none of the bloat.

#### nesting
You can nest rules within rules

```js
css`
  body{
    p{
      color : black;
    }
  }
`
//-->
`body p {
  color : black;
}`

```

#### parent selectors
The `&` operator represents the parent selectors of a nested rule and is most commonly used when applying a modifying class or pseudo-class to an existing selector.

```js
css`
  p{
    &:hover{ color : blue; }
    &.selected{ color : red; }
  }`;

//-->
`p:hover{
  color : blue;
}
p.selected{
  color : red;
}`
```

#### mixins (aka no-root selector)

You can pass just rules to the parser and it will process them. This allows you to build `mixins` which can be used to copy repeated css, or create functions that return chunks of css.

```js

const btn = (color)=>{
  return css`
    cursor : pointer;
    background-color: ${color};
    &:hover{
      background-color: ${lighten(color, 0.2)};
    }
  `
}

css`
  body{
    margin-top : 20px;
    button{
      font-size : 2em;
      ${btn('#dabb1e')}
    }
  }
`;
```

#### single line comments

Supports both block comments `/* */` and single line comments `//`

```js



```



## api

#### `css\`style\`` -> CSS String
The most common way to use `pico-css` is to use it as a tagged template literal. This will convert the template string and return valid a CSS string. You'll still need to save it, bundle it, or package it in some way, all `pico-css` cares about is parsing your styling.

```js
const css = require('pico-css');
const {lighten} = require('pico-css/chroma.js');

const btn = (color)=>{
  return css`
    cursor : pointer;
    background-color: ${color};
    &:hover{
      background-color: ${lighten(color, 0.2)};
    }
  `
}

css`
  body{
    margin-top : 20px;
    button{
      font-size : 2em;
      ${btn('#dabb1e')}
    }
  }
`;
```



#### `css.inject(styleObj) / css.inject\`style\`` -> Style Tag`
Converts and then creates a new `<style>` tag and injects it into the web document's head. Only works client side. Useufl for prototyping and experimenting.

```js
const css = require('pico-css');

css.inject`
  body{
    background-color : red;
  }
`
```
