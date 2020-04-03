/** Para documentar ejemplos de entrada: https://github.com/storybookjs/storybook/tree/master/addons/knobs */
import { array, text, boolean } from '@storybook/addon-knobs';
/** Para documentar los eventos: https://storybook.js.org/docs/addons/introduction/ */
import { action } from '@storybook/addon-actions';

export default {
  title: 'Correos Ui Menu'
}

function setCustomProperties(htmlElement, customProperties) {
  if (customProperties) {
    const cssVariables = Object
      .keys(customProperties)
      .reduce((properties, propertyName) => {
        return {
          ...properties,
          [propertyName]: text(propertyName, customProperties[propertyName], 'Custom CSS Properties')
        };
      }, {});
    Object.keys(cssVariables)
      .forEach(key => htmlElement.style.setProperty(key, cssVariables[key]));
  }
}

export const asTemplate = () => {

	/** Create element */
  const el = document.createElement('div');
	
  /** Set inner HTML template */
  const options = [
    "ola",
    "adios",
    "madrid"
  ];
  el.innerHTML = /*html*/`
		<correos-ui-menu
      name="${text('name', 'identificador', 'Value Properties')}"
			value="${text('value', 'ad', 'Value Properties')}"
      options="${array('options', options, ',', 'Value Properties')}"
      opened="${boolean('opened', true, 'Value Properties')}"
    >
		</correos-ui-menu>
  `.trim()

	/** Handles component element */
	const $wcUiInput = el.querySelector('correos-ui-menu');

	/** Set event actions to component: https://github.com/storybookjs/storybook/tree/master/addons/knobs */
	$wcUiInput.addEventListener('eventChange', e => action('eventChange')(e.detail));
	
	return el;
};