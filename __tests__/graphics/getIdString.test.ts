import { getIdString } from '../../bin/app/process/graphics/getIdString';

import { graphicsIds } from '../../testdata/graphics/getGraphics';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', () => {
    // @ts-ignore
    expect(() => getIdString()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly product a string of IDs from an array of IDs', () => {
    expect(getIdString(graphicsIds)).toBe('2710:7,2710:5');
  });
});
