const coarse = require('./lib');
const fs = require('fs');

const svg = fs.readFileSync('./test.svg');
fs.writeFileSync('./output.svg', coarse(svg));
