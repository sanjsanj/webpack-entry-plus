const { sync } = require('glob');

const entryObject = (params) => {
  return params.reduce((acc, item) => {
    const name = item.outputName;
    const value = item.entryFiles;
    acc[name] = value;
    return acc;
  }, {});
};

module.exports = entryObject;
