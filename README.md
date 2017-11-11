# webpack-entry-plus

Generate dynamic webpack bundle output names from known or unknown entry files.


[![NPM](https://nodei.co/npm/webpack-entry-plus.png?compact=true)](https://nodei.co/npm/webpack-entry-plus/)  [![Build Status](https://travis-ci.org/sanjsanj/webpack-entry-plus.svg?branch=master)](https://travis-ci.org/sanjsanj/webpack-entry-plus)  [![codecov](https://codecov.io/gh/sanjsanj/webpack-entry-plus/branch/master/graph/badge.svg)](https://codecov.io/gh/sanjsanj/webpack-entry-plus)

## Install

Install with npm:

```
npm install --save-dev webpack-entry-plus
```

## API

Must be passed an argument which is an array of objects that comply to this schema:

```
[
  {
    entryFiles: Array of String(s),
    outputName: String or Function that returns String,
  },
]
```

If you want to use wildcard matchers to include unknown files, use the included `glob` package like so:

```
[
  {
    entryFiles: glob.sync('./Folder1/**.js'),
    outputName: String or Function that returns String,
  },
]
```

If you want to have a dynamic output name, pass a function in to `outputName` that returns the `[name]` you want to use:

```
[
  {
    entryFiles: Array of String(s),
    outputName(item) {
      return item.replace('unwanted text', 'text');
      // or any other string transform you want
      // must return a string which will be the [name] in your output
    },
  },
]
```

## Example Usage

In your webpack.config.js first `import` or `require` the package and glob for wildcard matching, e.g:

```
const entryPlus = require('webpack-entry-plus');
const glob = require('glob');
```

Then create an array of objects containing your entry files:

```
const entryFiles = [
  {
    entryFiles: ['file1.js'],
    outputName: 'bundle1',
  },
  {
    entryFiles: ['file2.js', 'file3.js'],
    outputName: 'bundle2',
  },
  {
    entryFiles: ['react', 'react-dom'],
    outputName: 'react',
  },
  {
    entryFiles: glob.sync('./core/*.js'),
    outputName: 'core',
  },
  {
    entryFiles: glob.sync('./Folder1/**/*.js'),
    outputName(item) {
      return item.replace('Folder1/', '../');
    },
  },
];
```

Then pass the function in to the `entry` point of your config:

```
module.exports = {
  entry: entryPlus(entryFiles),

  output: {
    filename: '[name].js',
  },

  ...
}
```
