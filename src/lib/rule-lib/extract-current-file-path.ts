import { normalizePath } from '../path-lib';
import { type UnknownRuleContext } from './models';

export function extractCurrentFilePath(context: UnknownRuleContext) {
  const currentFilePath = context.getPhysicalFilename
    ? context.getPhysicalFilename()
    : context.getFilename(); /* FIXME: getFilename is deprecated */
  return normalizePath(currentFilePath);
}
