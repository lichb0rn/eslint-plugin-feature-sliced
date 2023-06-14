import {
  extractPathsInfo,
  isLayer,
} from '../../../lib/fsd-lib';
import {
  canValidate,
  extractRuleOptions,
  type ImportExportNodes,
} from '../../../lib/rule-lib';
import {
  IGNORED_LAYERS,
  type RuleContext,
} from '../config';
import { isPublicApi } from './is-public-api';
import { reportShouldBeFromPublicApi } from './errors-lib';

export function validateAndReport(node: ImportExportNodes, context: RuleContext) {
  if (!canValidate(node)) {
    return;
  }

  const ruleOptions = extractRuleOptions(context);
  const pathsInfo = extractPathsInfo(node, context);

  const isIgnoredLayer = pathsInfo.importLayer !== null && IGNORED_LAYERS.includes(pathsInfo.importLayer);
  const isUnknownLayer = !isLayer(pathsInfo.importLayer);

  if (isUnknownLayer || isIgnoredLayer) {
    return;
  }

  if (!isPublicApi(pathsInfo, ruleOptions)) {
    reportShouldBeFromPublicApi(node, context, pathsInfo);
  }
}
