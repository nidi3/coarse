const { JSDOM } = require('jsdom');
const rough = require('roughjs');

const getNum = (element, attribute) => parseInt(element.getAttribute(attribute), 10);

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
        svg.replaceChild(rc.circle(getNum(el, 'cx'), getNum(el, 'cy'), 2 * getNum(el, 'r')), el);
        break;
      case 'rect':
        svg.replaceChild(
          rc.rectangle(getNum(el, 'x'), getNum(el, 'y'), getNum(el, 'width'), getNum(el, 'height')),
          el
        );
        break;
      case 'polygon':
        svg.replaceChild(
          rc.polygon(
            el
              .getAttribute('points')
              .split(' ')
              .map(points =>
                points
                  .trim()
                  .split(',')
                  .map(coordinate => parseInt(coordinate, 10))
              )
          ),
          el
        );
        break;
      case 'path':
        svg.replaceChild(rc.path(el.getAttribute('d')), el);
        break;
      case 'line':
        svg.replaceChild(
          rc.line(getNum(el, 'x1'), getNum(el, 'y1'), getNum(el, 'x2'), getNum(el, 'y2')),
          el
        );
        break;
      case 'ellipse':
        svg.replaceChild(
          rc.ellipse(
            getNum(el, 'cx'),
            getNum(el, 'cy'),
            2 * getNum(el, 'rx'),
            2 * getNum(el, 'ry')
          ),
          el
        );
        break;
    }
  }

  return svg.outerHTML;
};

module.exports = coarse;
