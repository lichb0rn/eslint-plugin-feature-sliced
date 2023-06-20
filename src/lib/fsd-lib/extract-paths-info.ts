import {
  normalizePath,
  convertToAbsolute,
  isPathRelative,
} from '../path-lib';
import {
  type ImportExportNodesWithSourceValue,
  type UnknownRuleContext,
  isNodeType,
} from '../rule-lib';
import { extractFeatureSlicedParts } from './extract-feature-sliced-parts';
import { validateExtractedFeatureSlicedParts } from './validate-extracted-feature-sliced-parts';

function extractPaths(node: ImportExportNodesWithSourceValue, context: UnknownRuleContext) {
  const targetPath = node.source.value;
  const currentFilePath = context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename(); /* FIXME: getFilename is deprecated */

  const normalizedCurrentFilePath = normalizePath(currentFilePath);
  const normalizedTargetPath = normalizePath(targetPath);
  const absoluteTargetPath = convertToAbsolute(normalizedCurrentFilePath, normalizedTargetPath);

  return {
    targetPath,
    currentFilePath,
    normalizedTargetPath,
    normalizedCurrentFilePath,
    absoluteTargetPath,
  };
}

export function extractPathsInfo(node: ImportExportNodesWithSourceValue, context: UnknownRuleContext) {
  const {
    targetPath,
    currentFilePath,
    normalizedTargetPath,
    normalizedCurrentFilePath,
    absoluteTargetPath,
  } = extractPaths(node, context);

  const fsdPartsOfTarget = extractFeatureSlicedParts(absoluteTargetPath);
  const fsdPartsOfCurrentFile = extractFeatureSlicedParts(normalizedCurrentFilePath);

  const validatedFeatureSlicedPartsOfTarget = validateExtractedFeatureSlicedParts(fsdPartsOfTarget);
  const validatedFeatureSlicedPartsOfCurrentFile = validateExtractedFeatureSlicedParts(fsdPartsOfCurrentFile);

  const hasUnknownLayers = validatedFeatureSlicedPartsOfTarget.hasNotLayer || validatedFeatureSlicedPartsOfCurrentFile.hasNotLayer;
  const isType = isNodeType(node);
  const isRelative = isPathRelative(normalizedTargetPath);
  const isSameLayer = fsdPartsOfTarget.layer === fsdPartsOfCurrentFile.layer;
  const isSameSlice = validatedFeatureSlicedPartsOfTarget.hasSlice && validatedFeatureSlicedPartsOfCurrentFile.hasSlice
    && fsdPartsOfTarget.slice === fsdPartsOfCurrentFile.slice;
  const isSameSegment = fsdPartsOfTarget.segment === fsdPartsOfCurrentFile.segment;
  /**
   * Whether the import/export file and the current file are inside the same layer that cannot contain slices
   */
  const isSameLayerWithoutSlices = isSameLayer
    && !validatedFeatureSlicedPartsOfTarget.canLayerContainSlices
    && !validatedFeatureSlicedPartsOfCurrentFile.canLayerContainSlices;

  return {
    targetPath,
    currentFilePath,
    normalizedTargetPath,
    normalizedCurrentFilePath,
    absoluteTargetPath,

    fsdPartsOfTarget,
    fsdPartsOfCurrentFile,

    isType,
    isRelative,
    isSameLayer,
    isSameSlice,
    isSameSegment,
    isSameLayerWithoutSlices,
    hasUnknownLayers,

    validatedFeatureSlicedPartsOfTarget,
    validatedFeatureSlicedPartsOfCurrentFile,
  };
}

export type PathsInfo = ReturnType<typeof extractPathsInfo>
