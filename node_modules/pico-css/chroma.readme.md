# 🎨 chroma

Small color manipulation library.

`chroma` will parse `color` as any hexcode (3 or 6 characters), a `{r, g, b, a}` object, or a css color name from this list: `maroon`, `red`, `orange`, `yellow`, `olive`, `green`, `purple`, `fuchsia`, `lime`, `teal`, `aqua`, `blue`, `navy`, `black`, `gray`, `silver`, `white`


#### `fade(color, amount)` -> `color_hex`
Changes the `color`'s opacity based on the `amount` (0 -> 1)

```js
chroma.fade('#f00', 0.5) // #ff00007f
```


#### `darken(color, amount)` -> `color_hex`
Darkens the `color` by the `amount` (0 -> 1)

```js
chroma.darken('#C0FFEE', 0.1) // #ace5d6
chroma.darken('#C0FFEE', 0.4) // #73998e
```


#### `lighten(color, amount)` -> `color_hex`
Lightens the `color` by the `amount` (0 -> 1)

```js
chroma.lighten('#C0FFEE', 0.1) // #c6ffef
chroma.lighten('#C0FFEE', 0.4) // #d9fff4
```


#### `luminance(color)` -> `num[0, 1]`
Returns how "bright" the color is from `0` (black) to `1` (white);

```js
chroma.luminance('black')                 // 0
chroma.luminance({r: 34, g: 120, b: 200}) // 0.40
chroma.luminance('#16a085')               // 0.45
chroma.luminance('white')                 // 1
```


#### `isDark(color)` -> `boolean`

```js
chroma.isDark('maroon')  // true
chroma.isDark('#f1c40f') // false
```

#### `isBright(color)` -> `boolean`

```js
chroma.isBright('purple')  // false
chroma.isBright('#bdc3c7') // true
```

