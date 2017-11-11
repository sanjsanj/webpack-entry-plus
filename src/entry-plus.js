const entryObject = params => params.reduce((acc, item) => {
  if (typeof item.outputName === 'function') {
    item.entryFiles.map(entry => acc[item.outputName(entry)] = entry);
  } else {
    acc[item.outputName] = item.entryFiles;
  }
  return acc;
}, {});

module.exports = entryObject;
