/* eslint-env jest */

const coarse = require('.');
const isSvg = require('is-svg');

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
    '<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="Gradient01"><stop offset="20%" stop-color="#39F" /><stop offset="90%" stop-color="#F3F" /></linearGradient></defs></svg>';

  const result = coarse(svg);

  expect(result.includes('<defs>')).toBe(true);
  expect(result.includes('<linearGradient')).toBe(true);
  expect(isSvg(result)).toBe(true);
  expect(svg).not.toEqual(result);
});

it('does not modify attributes of the root element', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" class="svg"></svg>';

  const result = coarse(svg);

  expect(isSvg(result)).toBe(true);
  expect(svg).toEqual(result);
});
