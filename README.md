# HTML Href to Relative Webpack Plugin

[Webpack](https://github.com/webpack/webpack#readme) plugin for replace `<a href="/">` to relative path in HTML files.

## Installation

You can install the package as follows:

```sh
npm install @sumotto/html-href-to-relative-webpack-plugin --save-dev

# or

yarn add @sumotto/html-href-to-relative-webpack-plugin --dev
```

## Usage

Require the plugin in your Webpack config:

```js
const HtmlHrefToRelativePlugin = require( '@sumotto/html-href-to-relative-webpack-plugin' );

// or

import HtmlHrefToRelativePlugin from '@sumotto/html-href-to-relative-webpack-plugin';
```

Add the plugin to your webpack configuration's `plugins` array.
If you use [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin#readme)) then this plugin should go after him:

```js
plugins: [
	new HtmlWebpackPlugin(), // optional
	new HtmlHrefToRelativePlugin(),
]
```

## License

MIT License
