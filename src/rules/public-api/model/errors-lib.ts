import type { MessageIds, Options } from '../config';
import { MESSAGE_ID } from '../config';
import { getSourceRangeWithoutQuotes } from '../../../lib/rule-lib';
import { convertToPublicApi } from './convert-to-public-api';
import type { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';
import type { PathsInfo } from '../../../lib/fsd-lib';
import type { ImportExportNodesWithSourceValue } from '../../../lib/rule-lib';

export function reportShouldBeFromPublicApi(node: ImportExportNodesWithSourceValue, context: Readonly<RuleContext<MessageIds, Options>>, pathsInfo: PathsInfo) {
  const [fixedPath, valueToRemove] = convertToPublicApi(pathsInfo);

  context.report({
    node: node.source,
    messageId: MESSAGE_ID.SHOULD_BE_FROM_PUBLIC_API,
    data: {
      fixedPath,
    },
    suggest: [
      {
        messageId: MESSAGE_ID.REMOVE_SUGGESTION,
        data: {
          valueToRemove,
        },
        fix: (fixer) => fixer.replaceTextRange(getSourceRangeWithoutQuotes(node.source.range), fixedPath),
      },
    ],
  });
}
