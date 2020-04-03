import { addons } from '@storybook/addons';

import { stencil } from '../config.json';

/**
 * Adding environment to the window object.
 */
window.STENCIL_DEV_PROTOCOL = stencil.protocol;
window.STENCIL_DEV_HOST = stencil.host;
window.STENCIL_DEV_PORT = stencil.port;
window.STENCIL_DEV_ENV = process.env.NODE_ENV;

/**
 * Storybook config
 */
addons.setConfig({
	/**
   * show story component as full screen
   * @type {Boolean}
   */
	isFullscreen: false,

  /**
   * display panel that shows a list of stories
   * @type {Boolean}
   */
	showNav: true,

  /**
   * display panel that shows addon configurations
   * @type {Boolean}
   */
	showPanel: true,

  /**
   * where to show the addon panel
   * @type {('bottom'|'right')}
   */
	panelPosition: 'right',

  /**
   * sidebar tree animations
   * @type {Boolean}
   */
	sidebarAnimations: true,

  /**
   * enable/disable shortcuts
   * @type {Boolean}
   */
	enableShortcuts: true,

  /**
   * show/hide tool bar
   * @type {Boolean}
   */
	isToolshown: true,

  /**
   * theme storybook, see link below
   */
	theme: undefined,

  /**
   * id to select an addon panel
   * @type {String}
   */
	selectedPanel: 'storybook/knobs/panel',
});