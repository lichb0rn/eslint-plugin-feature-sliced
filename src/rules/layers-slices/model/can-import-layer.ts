import { type Layer } from '../../../config';
import {
  getLayerWeight,
  type PathsInfo,
} from '../../../lib/fsd-lib';

type RuleOptions = {
  allowTypeImports: boolean
};

export function canImportLayer(pathsInfo: PathsInfo, ruleOptions: RuleOptions) {
  const {
    targetPathFeatureSlicedParts,
    isType,
    currentFileLayer,
    isSameSlice,
    isSameLayerWithoutSlices,
    hasUnknownLayers,
  } = pathsInfo;
  const { allowTypeImports } = ruleOptions;

  if (hasUnknownLayers) {
    return true;
  }

  const isTypeAndAllowedToImport = allowTypeImports && isType;

  const importLayerOrder = getLayerWeight(
    targetPathFeatureSlicedParts.layer as Layer, /* ts doesn't understand that the check was done on hasUnknownLayers */
  );
  const currentFileLayerOrder = getLayerWeight(currentFileLayer as Layer /* ts doesn't understand that the check was done on hasUnknownLayers */);
  const isImportLayerBelowCurrent = currentFileLayerOrder > importLayerOrder;

  return isSameSlice
    || isTypeAndAllowedToImport
    || isSameLayerWithoutSlices
    || isImportLayerBelowCurrent;
}
