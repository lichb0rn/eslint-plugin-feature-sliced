import type { TSESTree } from '@typescript-eslint/utils';

/**
 *  TSESTree has invalid type for this node.
 *  https://astexplorer.net/#/gist/c72aaf4c7f7b4d57f554a4354f604d36/c416e580065f25d111fef37323e6001e2ea67ec1
 */
export type ImportExpression = TSESTree.ImportExpression & { source: TSESTree.StringLiteral }

export type ImportExportNodes = TSESTree.ImportDeclaration
	| ImportExpression
	| TSESTree.ExportAllDeclaration
	| TSESTree.ExportNamedDeclaration;

export type ImportExportNodesWithSourceValue = TSESTree.ImportDeclaration
	| ImportExpression
	| TSESTree.ExportAllDeclaration
	| TSESTree.ExportNamedDeclarationWithSource;

type ImportKindType = { importKind: 'type' }
type ExportKindType = { exportKind: 'type' };

export type ImportDeclarationKindType = TSESTree.ImportDeclaration & ImportKindType;
export type ExportAllDeclarationKindType = TSESTree.ExportAllDeclaration & ExportKindType;
export type ExportNamedDeclarationKindType = TSESTree.ExportNamedDeclaration & ExportKindType
