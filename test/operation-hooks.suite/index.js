'use strict';

const debug = require('debug')('test');
const fs = require('fs');
const path = require('path');

module.exports = function(dataSource, should, connectorCapabilities) {
  let operations = fs.readdirSync(__dirname);
  operations = operations.filter(function(it) {
    return it !== path.basename(__filename) &&
      !!require.extensions[path.extname(it).toLowerCase()];
  });
  for (const ix in operations) {
    const name = operations[ix];
    const fullPath = require.resolve('./' + name);
    debug('Loading test suite %s (%s)', name, fullPath);
    require(fullPath).apply(this, arguments);
  }
};
