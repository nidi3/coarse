const { JSDOM } = require('jsdom');
const rough = require('roughjs');

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
  const children = svg.children;

  // Create an element to append result to
  const output = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const rc = rough.svg(output, { options: roughOptions });

  // Move all attributes from input to output

  // Loop through all child elements
  for (let i = 0; i < children.length; i += 1) {
    const element = children[i];
    const tagName = element.tagName;

    switch (tagName) {
      case 'circle':
        output.appendChild(
          rc.circle(
            parseInt(element.getAttribute('cx'), 10),
            parseInt(element.getAttribute('cy'), 10),
            parseInt(2 * element.getAttribute('r'), 10)
          )
        );
        break;
      case 'rect':
        output.appendChild(
          rc.rectangle(
            parseInt(element.getAttribute('x'), 10),
            parseInt(element.getAttribute('y'), 10),
            parseInt(element.getAttribute('width'), 10),
            parseInt(element.getAttribute('height'), 10)
          )
        );
        break;
      case 'polygon':
        output.appendChild(
          rc.polygon(
            element
              .getAttribute('points')
              .split(' ')
              .map(points =>
                points
                  .trim()
                  .split(',')
                  .map(coordinate => parseInt(coordinate, 10))
              )
          )
        );
        break;
      case 'path':
        output.appendChild(rc.path(element.getAttribute('d')));
        break;
      case 'line':
        output.appendChild(
          rc.line(
            parseInt(element.getAttribute('x1'), 10),
            parseInt(element.getAttribute('y1'), 10),
            parseInt(element.getAttribute('x2'), 10),
            parseInt(element.getAttribute('y2'), 10)
          )
        );
        break;
      case 'ellipse':
        output.appendChild(
          rc.ellipse(
            parseInt(element.getAttribute('cx'), 10),
            parseInt(element.getAttribute('cy'), 10),
            parseInt(2 * element.getAttribute('rx'), 10),
            parseInt(2 * element.getAttribute('ry'), 10)
          )
        );
        break;
      default:
        output.appendChild(element);
    }
  }

  return output.outerHTML;
};

module.exports = coarse;
