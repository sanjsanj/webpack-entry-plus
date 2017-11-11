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
});
