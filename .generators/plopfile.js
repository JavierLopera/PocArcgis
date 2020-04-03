const config = require('../config.json');
const capitalize = require('lodash/capitalize');

module.exports = function (plop) {
	// Generator prefix
	const { prefix = 'wc' } = config.stencil;
	plop.setHelper('storyName', (text) => capitalize(text).replace(/-/g, ' '));
	// create your generators here
	plop.setGenerator('Component', {
		description: 'Create a stencil JS component',
		// array of inquirer prompts
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component Name'
			},
			{
				type: 'list',
				name: 'componentType',
				choices: [
					{
						name: 'Design system',
						value: 'ui'
					},
					{
						name: 'CDK',
						value: 'cdk'
					}
				]
			}
		],
		// array of actions
		actions: [
			// Add all the template files to the dest folder
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.tsx',
				templateFile: 'component/{{componentType}}/component/component.tsx.hbs'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.scss',
				templateFile: 'component/{{componentType}}/component/component.scss.hbs'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.theme.scss',
				templateFile: 'component/{{componentType}}/component/component.theme.scss.hbs'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/models/{{componentType}}-{{dashCase name}}.model.ts',
				templateFile: 'component/{{componentType}}/models/component.model.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.e2e.ts',
				templateFile: 'component/{{componentType}}/test/component.e2e.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.spec.ts',
				templateFile: 'component/{{componentType}}/test/component.spec.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/{{componentType}}-{{dashCase name}}.stories.mdx',
				templateFile: 'component/{{componentType}}/component.stories.mdx'
			},
			//   Update all the tempates files with the data
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.tsx',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{dashCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.tsx',
				pattern: /style-template-component/g,
				template: `{{componentType}}-{{dashCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.tsx',
				pattern: /template-component/g,
				template: '{{dashCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.tsx',
				pattern: /TemplateComponent/g,
				template: '{{pascalCase componentType}}{{pascalCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/component/{{componentType}}-{{dashCase name}}.scss',
				pattern: /templateComponentType/g,
				template: '{{componentType}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.e2e.ts',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{dashCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.e2e.ts',
				pattern: /template-component/g,
				template: '{{componentType}}-{{dashCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.spec.ts',
				pattern: /template-component/g,
				template: '{{componentType}}-{{dashCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/test/{{componentType}}-{{dashCase name}}.spec.ts',
				pattern: /TemplateComponent/g,
				template: '{{pascalCase componentType}}{{pascalCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/{{componentType}}-{{dashCase name}}.stories.mdx',
				pattern: /TemplateComponentName/g,
				template: '{{storyName name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/{{componentType}}-{{dashCase name}}.stories.mdx',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{dashCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{dashCase name}}/{{componentType}}-{{dashCase name}}.stories.mdx',
				pattern: /template-component/g,
				template: `{{componentType}}-{{dashCase name}}`
			}
		]
	});
};
