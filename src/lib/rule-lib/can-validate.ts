import { isObject } from '../shared';
import type { ImportExportNodesWithSourceValue } from './models';

/**
 * Checks if a node has a path for validation.
 * This function can be used in any rule because all rules only check paths.
 * @example ```
 *  export { foo }; // false, can't validate by rules
 *  export const foo = 'foo'; // false
 *  export * from './foo'; // true, can validate
 *  export * as bar from './foo'; // true
 *  import './foo'; // true
 *  import foo from './foo'; // true
 * ```
 */
export function canValidate(node: unknown): node is ImportExportNodesWithSourceValue {
  if (isObject(node) && 'source' in node) {
    return node.source !== null;
  }

  return false;
}
