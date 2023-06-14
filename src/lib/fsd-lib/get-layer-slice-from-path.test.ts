import { getLayerSliceFromPath } from './get-layer-slice-from-path';

const layerCases = [
  {
    path: 'src/entities/foo',
    expected: 'entities',
  },
  {
    path: 'some/long/root/path/entities/foo',
    expected: 'entities',
  },
  {
    path: 'entities/foo',
    expected: 'entities',
  },
  {
    path: 'EntitiEs/foo',
    expected: 'entities',
  },
  {
    path: './index.ts',
    expected: null,
  },
  {
    path: './app.ts',
    expected: null,
  },
  {
    path: './entitiesInName.ts',
    expected: null,
  },
];

const sliceCases = [
  {
    path: 'src/entities/foo',
    expected: 'foo',
  },
  {
    path: 'entities/foo',
    expected: 'foo',
  },
  {
    path: 'entities/foo/bar/baz',
    expected: 'foo',
  },
  {
    path: 'some/long/path/entities/foo/bar/baz',
    expected: 'foo',
  },
  {
    path: 'some/long/path/entities/foo/bar/baz.tsx',
    expected: 'foo',
  },
  {
    path: 'src/app/App.tsx',
    expected: null,
  },
  {
    path: 'src/app',
    expected: null,
  },
  {
    path: '/Users/conarti/Projects/feature-sliced-frontend/src/entities/foo-bar-baz/ui/index.vue',
    expected: 'foo-bar-baz',
  },
];

describe('get-layer-slice-from-path', () => {
  it.each(layerCases)('should correct return layer %#', ({
    path,
    expected,
  }) => {
    const [actual] = getLayerSliceFromPath(path);
    expect(actual).toBe(expected);
  });

  it.each(sliceCases)('should correct return slice %#', ({
    path,
    expected,
  }) => {
    const [, actual] = getLayerSliceFromPath(path);
    expect(actual).toBe(expected);
  });
});
