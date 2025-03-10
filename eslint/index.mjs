// @ts-check
import tseslint from 'typescript-eslint';
import { builtinModules } from 'module';

import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
		},
		rules: {
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'ignore',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			camelcase: ['warn', { ignoreDestructuring: true, properties: 'never' }],
			'unused-imports/no-unused-imports': ['error'],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['dotenv'],
						[`^(${builtinModules.join('|')})(/|$)`],
						// Packages. `react` related packages come first.
						['^@?\\w'],
						// Internal packages.
						['^(@app)(/.*|$)'],
						['^(@assets)(/.*|$)'],
						// Side effect imports.
						['^\\u0000'],
						// Parent imports. Put `..` last.
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Other relative imports. Put same-folder imports and `.` last.
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
			'linebreak-style': ['error', 'unix'],
		},
	})