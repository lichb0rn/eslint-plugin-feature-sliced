import { type PathsInfo } from '../../../lib/fsd-lib';

export function shouldBeRelative(pathsInfo: PathsInfo): boolean {
  const {
    isRelative,
    isSameLayerWithoutSlices,
    isSameLayer,
    isSameSlice,
    hasNotCurrentFileSlice,
  } = pathsInfo;

  if (isRelative) {
    return false;
  }

  if (hasNotCurrentFileSlice && isSameLayer) {
    return true;
  }

  if (isSameLayerWithoutSlices) {
    return true;
  }

  return isSameSlice && isSameLayer;
}
