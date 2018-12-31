# webpack-entry-plus

Generate dynamic webpack bundle output names from wildcarded entry files.

[![NPM](https://nodei.co/npm/webpack-entry-plus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/webpack-entry-plus/)

[![NPM Monthly Downloads](https://img.shields.io/npm/dm/localeval.svg)](https://npmjs.com/package/webpack-entry-plus)
[![Code Size](https://img.shields.io/bundlephobia/minzip/react.svg)](https://github.com/sanjsanj/webpack-entry-plus/blob/master/src/entry-plus.js)
[![Build Status](https://travis-ci.org/sanjsanj/webpack-entry-plus.svg?branch=master)](https://travis-ci.org/sanjsanj/webpack-entry-plus)  [![codecov](https://codecov.io/gh/sanjsanj/webpack-entry-plus/branch/master/graph/badge.svg)](https://codecov.io/gh/sanjsanj/webpack-entry-plus)

## Why?

This package solves the problem of not knowing (or wanting to hardcode) all of our output bundles' names.  Particularly useful if you're building a CMS-based architecture or multi-page app.  [Read more about it here](https://medium.com/@sanjsanj/webpack-creating-dynamically-named-outputs-for-wildcarded-entry-files-9241f596b065).

## Install

Install with npm:

```
npm install --save-dev webpack-entry-plus
```

## API

Must be passed an argument which is an `[ Array of { Objects } ]` that comply to this schema:

```
[
  {
    entryFiles: Array of String(s),
    outputName: String, or Function that returns a String,
  },
]
```

If we want to use wildcard matchers to include unknown files, use the included `glob` package like so:

```
// import glob
const glob = require('glob');

[
  {
    entryFiles: glob.sync('./Folder1/*.js'),
    outputName: String or Function that returns String,
  },
]
```

If we want to create a dynamic output name, pass a function in to `outputName` that takes one argument and returns the `[name]` we want to use.  The argument, `(item)` in this example, is the filepath for the file being processed:

```
[
  {
    entryFiles: Array of String(s),
    outputName(item) {
      return item.replace('unwanted text', 'text');
      // or any other string transform we want
      // must return a string which will become the [name] in our output
    },
  },
]
```

- If we pass a String in to `outputName` it will bundle all the `entryFiles` in to one.

- If we pass a Function in to `outputName` it will process each entry file in to it's own bundle, using the returned value of `outputName(entryFile[singular])` as the `[name]` in webpack's output object.

## Example Usage

```
// webpack.config.js
// First `import` or `require` this package, and glob for wildcard matching, e.g:

const entryPlus = require('webpack-entry-plus');
const glob = require('glob');

// Then create an Array of Objects containing our entry files:

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
    entryFiles: ['react', 'react-dom'],  // node modules work too
    outputName: 'react',
  },
  {
    entryFiles: glob.sync('./core/*.js'),
    outputName: 'core',
  },
  {
    entryFiles: glob.sync('./Folder1/**/*-entry.js'),
    outputName(item) {
      return item.replace('Folder1/', '../');
    },
  },
];

Then pass the function in to the `entry` point of our config:

module.exports = {
  entry: entryPlus(entryFiles),

  output: {
    filename: '[name].js',
  },

  ...
}
```
