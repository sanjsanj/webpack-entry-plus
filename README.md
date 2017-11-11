# webpack-entry-plus

Generate dynamic webpack bundle output names from known or unknown entry files.

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

## Example Usage

In your webpack.config.js first `import` or `require` the package, e.g:

```
const entryPlus = require('webpack-entry-plus');
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
