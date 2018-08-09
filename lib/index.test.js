/* eslint-env jest */

const isSvg = require('is-svg');
const coarse = require('.');

// Mock svgs
const inkscapeSvg = require('../test/fixtures/inkscape-svg');
const floatSvg = require('../test/fixtures/float-svg');

it('converts an svg with a circle to a valid svg', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a rect to a valid svg', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="2" height="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a polygon to a valid svg', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="100,100 150,25 150,75 200,0" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a polyline to a valid svg', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><polyline points="100,100 150,25 150,75 200,0" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a path to a valid svg', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><path d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a line to a valid svg', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="1" x2="2" y2="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with an ellipse to a valid svg', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><ellipse cx="1" cy="1" rx="2" ry="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('does not modify unrecognised elements', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="Gradient01"><stop offset="20%" stop-color="#39F"></stop><stop offset="90%" stop-color="#F3F"></stop></linearGradient></defs></svg>';

  const result = coarse(svg);
  expect(svg).toEqual(result);
});

it('does not modify attributes of the root element', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" class="svg"></svg>';

  const result = coarse(svg);
  expect(svg).toEqual(result);
});

it('copies over shape attributes that are not on the blacklist', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" fill-opacity="0.7" /></svg>';

  const result = coarse(svg);
  expect(result.includes('fill-opacity="0.7"')).toEqual(true);
});

it('ignores shape attributes that are on the blacklist', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('cx')).toEqual(false);
});

it('converts a shape with a fill to a valid shape', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" fill="red" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts a shape with a stroke to a valid shape', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" stroke="green" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts a shape with a stroke-width to a valid shape', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" stroke-width="2" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts a path with a fill to a valid shape', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts a polygon with a fill to a valid shape', () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg"><polygon fill="red" points="100,100 150,25 150,75 200,0" /></svg>';

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg with a shape nested in a <g> element correctly', () => {
  const svg = `
    <svg xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <polygon points="8,-72 8,-365 98,-365 98,-72 8,-72" />
      </g>
    </svg>
  `;

  expect(() => coarse(svg)).not.toThrowError();
});

it('converts an inkscape svg successfully', () => {
  const svg = inkscapeSvg;

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('converts an svg that uses floats successfully', () => {
  const svg = floatSvg;

  const result = coarse(svg);
  expect(result.includes('path')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});
