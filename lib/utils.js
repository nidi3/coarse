/**
 * Get all attributes of an element as an array of { name, value } objects
 */

const getAttributes = element => Array.prototype.slice.call(element.attributes);

/**
 * Return the numerical value of each attribute as an array of ints
 */

const getNum = (element, attributes) =>
  attributes.map(attribute => parseFloat(element.getAttribute(attribute), 10));

/**
 * Return the numerical value of each attribute as an array of ints, multiplied by two
 */

const getDiam = (element, attributes) =>
  attributes.map(attribute => 2 * parseFloat(element.getAttribute(attribute), 10));

/**
 * Convert a points attribute to an array that can be consumed by rough
 */

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
        .map(num => parseFloat(num, 10))
    );

/**
 * Converts attributes to settings for rough
 */

const getSettings = element => {
  const settings = {};

  if (element.hasAttribute('stroke')) {
    settings.stroke = element.getAttribute('stroke');
  }

  if (element.hasAttribute('fill')) {
    settings.fill = element.getAttribute('fill');
  }

  if (element.hasAttribute('stroke-width') && !element.getAttribute('stroke-width').includes('%')) {
    settings.strokeWidth = parseFloat(element.getAttribute('stroke-width'), 10);
  }

  return settings;
};

module.exports = {
  getAttributes,
  getSettings,
  getNum,
  getDiam,
  getCoords
};
