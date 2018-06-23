const { JSDOM } = require('jsdom');
const rough = require('roughjs');

/**
 * Helpers
 */

const getNum = (element, attributes) =>
  attributes.map(attribute => parseInt(element.getAttribute(attribute), 10));

const getDiam = (element, attributes) =>
  attributes.map(attribute => 2 * parseInt(element.getAttribute(attribute), 10));

const getCoords = (element, attribute) =>
  element
    .getAttribute(attribute)
    .trim()
    .split(' ')
    .filter(item => item.length > 0)
    .map(item =>
      item
        .trim()
        .split(',')
        .map(num => parseInt(num, 10))
    );

const getOptions = element => {
  const options = {};

  if (element.hasAttribute('stroke')) {
    options.stroke = element.getAttribute('stroke');
  }

  if (element.hasAttribute('fill')) {
    options.fill = element.getAttribute('fill');
  }

  if (element.hasAttribute('stroke-width') && !element.getAttribute('stroke-width').includes('%')) {
    options.strokeWidth = parseInt(element.getAttribute('stroke-width'), 10);
  }

  return options;
};

/**
 * Convert an svg server-side with rough
 * @kind function
 * @param {string} input An svg string to render with rough
 * @param {Object} [options={}] Global configuration options for rough
 * @returns {string} The svg as a string, containing the rendered shapes
 */

const coarse = (input, options = {}) => {
  const { window } = new JSDOM();

  // Parse svg and get child elements
  window.document.body.insertAdjacentHTML('beforebegin', input);
  const svg = window.document.querySelector('svg');
  const rc = rough.svg(svg, { options });
  const children = svg.children;

  // Loop through all child elements
  for (let i = 0; i < children.length; i += 1) {
    const el = children[i];
    const tagName = el.tagName;
    const params = [];

    switch (tagName) {
      case 'circle':
        params.push(...getNum(el, ['cx', 'cy']), ...getDiam(el, ['r']));
        svg.replaceChild(rc.circle(...params, getOptions(el)), el);
        break;
      case 'rect':
        params.push(...getNum(el, ['x', 'y', 'width', 'height']));
        svg.replaceChild(rc.rectangle(...params, getOptions(el)), el);
        break;
      case 'ellipse':
        params.push(...getNum(el, ['cx', 'cy']), ...getDiam(el, ['rx', 'ry']));
        svg.replaceChild(rc.ellipse(...params, getOptions(el)), el);
        break;
      case 'line':
        params.push(...getNum(el, ['x1', 'y1', 'x2', 'y2']));
        svg.replaceChild(rc.line(...params, getOptions(el)), el);
        break;
      case 'polygon':
        svg.replaceChild(rc.polygon(getCoords(el, 'points'), getOptions(el)), el);
        break;
      case 'polyline':
        svg.replaceChild(rc.linearPath(getCoords(el, 'points'), getOptions(el)), el);
        break;
      case 'path':
        svg.replaceChild(rc.path(el.getAttribute('d'), getOptions(el)), el);
        break;
    }
  }

  return svg.outerHTML;
};

module.exports = coarse;
