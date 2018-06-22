const { JSDOM } = require('jsdom');
const rough = require('roughjs');

/**
 * Supported svg elements
 */

const allowed = ['circle', 'ellipse', 'line', 'path', 'polygon', 'rect'];

/**
 * Convert an svg server-side with rough
 * @kind function
 * @param {strin} svg An svg string to render with rough
 * @param {Object} [options={}] Configuration options
 * @param {Object} [options.roughOptions={}] Global configuration options for rough
 * @returns {string} The svg as a string, containing the rendered shapes
 */

const coarse = (svg, options = {}) => {
  const { window } = new JSDOM();
  const roughOptions = options.roughOptions || {};

  // Parse svg and get child elements
  window.document.body.insertAdjacentHTML('beforebegin', svg);
  const shapes = window.document.querySelector('svg').children;

  // Create an element to append result to
  const output = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const rc = rough.svg(output, { options: roughOptions });

  // Loop through all defined shapes
  for (let i = 0; i < shapes.length; i += 1) {
    const shape = shapes[i];
    const tagName = shape.tagName;

    if (allowed.includes(tagName)) {
      switch (tagName) {
        case 'circle':
          output.appendChild(
            rc.circle(
              parseInt(shape.getAttribute('cx'), 10),
              parseInt(shape.getAttribute('cy'), 10),
              parseInt(2 * shape.getAttribute('r'), 10)
            )
          );
          break;
        case 'rect':
          output.appendChild(
            rc.rectangle(
              parseInt(shape.getAttribute('x'), 10),
              parseInt(shape.getAttribute('y'), 10),
              parseInt(shape.getAttribute('width'), 10),
              parseInt(shape.getAttribute('height'), 10)
            )
          );
          break;
        case 'polygon':
          output.appendChild(
            rc.polygon(
              shape
                .getAttribute('points')
                .split(' ')
                .map(coordinate => coordinate.trim().split(','))
            )
          );
          break;
        case 'path':
          output.appendChild(rc.path(shape.getAttribute('d')));
          break;
        case 'line':
          output.appendChild(
            rc.line(
              parseInt(shape.getAttribute('x1'), 10),
              parseInt(shape.getAttribute('y1'), 10),
              parseInt(shape.getAttribute('x2'), 10),
              parseInt(shape.getAttribute('y2'), 10)
            )
          );
          break;
        case 'ellipse':
          output.appendChild(
            rc.ellipse(
              parseInt(shape.getAttribute('cx'), 10),
              parseInt(shape.getAttribute('cy'), 10),
              parseInt(2 * shape.getAttribute('rx'), 10),
              parseInt(2 * shape.getAttribute('ry'), 10)
            )
          );
          break;
      }
    }
  }

  return output.outerHTML;
};

module.exports = coarse;
