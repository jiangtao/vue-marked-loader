# vue-marked-loader

> Convert Markdown file to Vue Component using markdown-it, support custom languages

## Installation

```bash
npm i vue-marked-loader -D
```

## Feature

- Hot reload
- Write vue script
- Code highlight
- support custom languages

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

`webpack.config.js` file:

```javascript
module.exports = {
  module: {
    loaders: [{
      test: /\.md/,
      loader: 'vue-marked-loader'
    }]
  },
  code2html: ['props'],  // support ```props
  use: function(marked, code, lang, highlight) {
    if(lang == 'props'){ // ```props return your custom container
      return `<div class="json"><pre><code>//  custom container \n${code}</code></pre></div>`
    }
  }
};
```

the full usage, please view example folder

## attention

When the markdown file is compiled, make sure that `script`, `style` are just once included. You  can check your compiled file in the folder `node_modules/vue-marked-loader/.cache/`

## Thanks

- based on [marked](https://github.com/chjj/marked)
- read and learn [vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader)

## License
MIT

