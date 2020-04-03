import { create } from '@storybook/theming';

export default create({

	base: 'light',

	colorPrimary: '#FFCD00',
	colorSecondary: '#000066',
  
	// UI
	// appBg: '#FFCD00',
	// appContentBg: 'silver',
	// appBorderColor: '#b38f00',
	appBorderRadius: 8,
  
	// // Typography
	// fontBase: 'Cartero',
	// fontCode: 'monospace',
  
	// // Text colors
	textColor: 'black',
	// textInverseColor: 'rgba(255,255,255,0.9)',
  
	// // Toolbar default and active colors
	barTextColor: 'black',
	barSelectedColor: '#000066',
	// barBg: 'hotpink',
  
	brandTitle: 'Correos España',
	brandUrl: 'http://localhost:4200/',
	brandImage: 'http://localhost:4200/images/logo-correos.png',
});
