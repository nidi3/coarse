const { JSDOM } = require('jsdom');
const rough = require('roughjs');

const getNum = (element, attributes) =>
  attributes.map(attribute => parseInt(element.getAttribute(attribute), 10));

const getDiam = (element, attributes) =>
  attributes.map(attribute => 2 * parseInt(element.getAttribute(attribute), 10));

const getCoords = (element, attribute) =>
  element
    .getAttribute(attribute)
    .split(' ')
    .map(pair =>
      pair
        .trim()
        .split(',')
        .map(num => parseInt(num, 10))
    );

/**
 * Convert an svg server-side with rough
 * @kind function
 * @param {string} input An svg string to render with rough
 * @param {Object} [options={}] Configuration options
 * @param {Object} [options.roughOptions={}] Global configuration options for rough
 * @returns {string} The svg as a string, containing the rendered shapes
 */

const coarse = (input, options = {}) => {
  const { window } = new JSDOM();
  const roughOptions = options.roughOptions || {};

  // Parse svg and get child elements
  window.document.body.insertAdjacentHTML('beforebegin', input);
  const svg = window.document.querySelector('svg');
  const rc = rough.svg(svg, { options: roughOptions });
  const children = svg.children;

  // Loop through all child elements
  for (let i = 0; i < children.length; i += 1) {
    const el = children[i];
    const tagName = el.tagName;

    switch (tagName) {
      case 'circle':
        svg.replaceChild(rc.circle(...getNum(el, ['cx', 'cy']), ...getDiam(el, ['r'])), el);
        break;
      case 'rect':
        svg.replaceChild(rc.rectangle(...getNum(el, ['x', 'y', 'width', 'height'])), el);
        break;
      case 'polygon':
        svg.replaceChild(rc.polygon(getCoords(el, 'points')), el);
        break;
      case 'polyline':
        svg.replaceChild(rc.linearPath(getCoords(el, 'points')), el);
        break;
      case 'path':
        svg.replaceChild(rc.path(el.getAttribute('d')), el);
        break;
      case 'line':
        svg.replaceChild(rc.line(...getNum(el, ['x1', 'y1', 'x2', 'y2'])), el);
        break;
      case 'ellipse':
        svg.replaceChild(rc.ellipse(...getNum(el, ['cx', 'cy']), ...getDiam(el, ['rx', 'ry'])), el);
        break;
    }
  }

  return svg.outerHTML;
};

module.exports = coarse;
