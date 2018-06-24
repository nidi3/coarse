# coarse

[![build status][build-badge]][build-url]
[![coverage status][coverage-badge]][coverage-url]
[![greenkeeper][greenkeeper-badge]][greenkeeper-url]

> convert an svg server-side with rough

A simple wrapper that converts SVGs server-side to a more rough version with [rough](https://github.com/pshihn/rough).

## Installation

```
$ npm install coarse
```

## Example

So for example, to render an svg with rough:

```javascript
const fs = require('fs');
const coarse = require('coarse');

const svg = fs.readFileSync('./input.svg');
const roughened = coarse(svg);

fs.writeFileSync('./output.svg', roughened);
```

## API

### coarse(input, [options]) ⇒ <code>string</code>
Convert an svg server-side with rough

**Kind**: global function
**Returns**: <code>string</code> - The converted svg as a string

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | An svg string to render with rough |
| [options] | <code>Object</code> | <code>{}</code> | Global configuration options for rough |

## License

[MIT](http://ismay.mit-license.org/)

[build-badge]: https://travis-ci.org/ismay/coarse.svg?branch=master
[build-url]: https://travis-ci.org/ismay/coarse
[greenkeeper-badge]: https://badges.greenkeeper.io/ismay/coarse.svg
[greenkeeper-url]: https://greenkeeper.io/
[coverage-badge]: https://coveralls.io/repos/github/ismay/coarse/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/ismay/coarse?branch=master
