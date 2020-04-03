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
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.tsx',
				templateFile: 'component/{{componentType}}/component/component.tsx'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.scss',
				templateFile: 'component/{{componentType}}/component/component.scss'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/models/{{componentType}}-{{kebabCase name}}.model.ts',
				templateFile: 'component/{{componentType}}/models/component.model.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.e2e.ts',
				templateFile: 'component/{{componentType}}/test/component.e2e.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.spec.ts',
				templateFile: 'component/{{componentType}}/test/component.spec.ts'
			},
			{
				type: 'add',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/{{componentType}}-{{kebabCase name}}.stories.mdx',
				templateFile: 'component/{{componentType}}/component.stories.mdx'
			},
			//   Update all the tempates files with the data
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.tsx',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{kebabCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.tsx',
				pattern: /style-template-component/g,
				template: `{{componentType}}-{{kebabCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.tsx',
				pattern: /template-component/g,
				template: '{{kebabCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.tsx',
				pattern: /TemplateComponent/g,
				template: '{{pascalCase componentType}}{{pascalCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/component/{{componentType}}-{{kebabCase name}}.scss',
				pattern: /templateComponentType/g,
				template: '{{componentType}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.e2e.ts',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{kebabCase name}}`
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.e2e.ts',
				pattern: /template-component/g,
				template: '{{componentType}}-{{kebabCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.spec.ts',
				pattern: /template-component/g,
				template: '{{componentType}}-{{kebabCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/test/{{componentType}}-{{kebabCase name}}.spec.ts',
				pattern: /TemplateComponent/g,
				template: '{{pascalCase componentType}}{{pascalCase name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/{{componentType}}-{{kebabCase name}}.stories.mdx',
				pattern: /TemplateComponentName/g,
				template: '{{storyName name}}'
			},
			{
				type: 'modify',
				path: '../src/components/{{componentType}}/{{componentType}}-{{kebabCase name}}/{{componentType}}-{{kebabCase name}}.stories.mdx',
				pattern: /tag-template-component/g,
				template: `${prefix}-{{componentType}}-{{kebabCase name}}`
			}
		]
	});
};
