/* global describe, test, expect */

const entryPlus = require('../src/entry-plus');

describe('webpack-entry-plus', () => {
  describe('When passed one known file', () => {
    describe('And a known output path', () => {
      test('Returns the right object', () => {
        const params = [{
          entryFiles: './file.ext',
          outputName: 'bundle',
        }];

        const actual = entryPlus(params);

        const expected = {
          [params[0].outputName]: params[0].entryFiles,
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When passed multiple known files', () => {
    describe('With known output paths', () => {
      test('Returns the right object', () => {
        const params = [
          {
            entryFiles: './file1.ext',
            outputName: 'bundle1',
          },
          {
            entryFiles: './file2.ext',
            outputName: 'bundle2',
          },
        ];

        const actual = entryPlus(params);

        const expected = {
          [params[0].outputName]: params[0].entryFiles,
          [params[1].outputName]: params[1].entryFiles,
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When passed one array of known files', () => {
    describe('And a known output path', () => {
      test('Returns the right object', () => {
        const params = [{
          entryFiles: ['./file1.ext', './file2.ext'],
          outputName: 'bundle',
        }];

        const actual = entryPlus(params);

        const expected = {
          [params[0].outputName]: params[0].entryFiles,
        };

        expect(actual).toEqual(expected);
      });
    });

    describe('And an output path function', () => {
      test('Returns the right object', () => {
        const params = [{
          entryFiles: ['./file1.ext', './file2.ext'],
          outputName(item) { return item; },
        }];

        const actual = entryPlus(params);

        const expected = {
          [params[0].entryFiles[0]]: params[0].entryFiles[0],
          [params[0].entryFiles[1]]: params[0].entryFiles[1],
        };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When passed multiple arrays of known files', () => {
    describe('And a known output path', () => {
      test('Returns the right object', () => {
        const params = [
          {
            entryFiles: ['./file1.ext', './file2.ext'],
            outputName: 'bundle1',
          },
          {
            entryFiles: ['./file1.ext', './file3.ext'],
            outputName: 'bundle2',
          },
          {
            entryFiles: ['./file4.ext', './file5.ext'],
            outputName: 'bundle3',
          },
        ];

        const actual = entryPlus(params);

        const expected = {
          [params[0].outputName]: params[0].entryFiles,
          [params[1].outputName]: params[1].entryFiles,
          [params[2].outputName]: params[2].entryFiles,
        };

        expect(actual).toEqual(expected);
      });
    });

    describe('And an output path function', () => {
      test('Returns the right object', () => {
        const params = [
          {
            entryFiles: ['./file1.ext', './file2.ext'],
            outputName: 'bundle1',
          },
          {
            entryFiles: ['./file1.ext', './file3.ext'],
            outputName: 'bundle2',
          },
          {
            entryFiles: ['./file4.ext', './file5.ext'],
            outputName(item) { return item; },
          },
        ];

        const actual = entryPlus(params);

        const expected = {
          [params[0].outputName]: params[0].entryFiles,
          [params[1].outputName]: params[1].entryFiles,
          [params[2].entryFiles[0]]: params[2].entryFiles[0],
          [params[2].entryFiles[1]]: params[2].entryFiles[1],
        };

        expect(actual).toEqual(expected);
      });
    });
  });
});
