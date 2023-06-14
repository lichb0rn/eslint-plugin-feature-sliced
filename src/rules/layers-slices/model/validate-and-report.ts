import { extractPathsInfo } from '../../../lib/fsd-lib';
import {
  extractRuleOptions,
  isIgnored,
} from '../../../lib/rule-lib';
import type { Options } from '../config';
import { canImportLayer } from './can-import-layer';
import { reportCanNotImportLayer } from './errors-lib';

export function validateAndReport(node, context) {
  const pathsInfo = extractPathsInfo(node, context);
  const userDefinedRuleOptions = extractRuleOptions<Options>(context);

  if (isIgnored(pathsInfo.importPath, userDefinedRuleOptions.ignorePatterns)) {
    return;
  }

  if (!canImportLayer(pathsInfo, userDefinedRuleOptions)) {
    reportCanNotImportLayer(context, node, pathsInfo);
  }
}
