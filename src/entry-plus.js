const entryObject = params => params.reduce((acc, item) => {
  if (typeof item.outputName === 'function') {
    item.entryFiles.map(entry => acc[item.outputName(entry)] = entry);
  } else {
    const name = item.outputName;
    const value = item.entryFiles;
    acc[name] = value;
  }
  return acc;
}, {});

module.exports = entryObject;
