/** Para documentar ejemplos de entrada: https://github.com/storybookjs/storybook/tree/master/addons/knobs */
import { array, text, boolean } from '@storybook/addon-knobs';
import ButtonReadme from './readme.md'

export default {
  title: 'correos-ui-input',
	parameters: {
		readme: {
			// Show readme before story
			content: ButtonReadme,
			// Show readme at the addons panel
			sidebar: ButtonReadme,
		}
	}
}

export const CustomElement = () => {

	/** Create element */
  const el = document.createElement('div');

  /* Icon src possibilities */
  let iconElement = null;
  iconElement = '<img slot="icon" src="https://freeiconshop.com/wp-content/uploads/edd/phone-solid.png" />';
	
  /** Set inner HTML template */
  const options = [
    "Valladolid",
    "Valencia",
    "Madrid"
  ];
  el.innerHTML = /*html*/`
		<correos-ui-input
			value="${text('value', 'Prefilled value default', 'Value Properties')}"
			label="${text('label', 'Nombre', 'Value Properties')}"
      pattern="${text('pattern', '^[a-zA-Z]+$', 'Value Properties')}"
      required="${boolean('required', false, 'Value Properties')}"
      autofocus="${boolean('autofocus', true, 'Value Properties')}"
      placeholder="${text('placeholder', 'Rellene con valor necesario', 'Value Properties')}"
      minlength="${text('minlength', '8', 'Value Properties')}"
      maxlength="${text('maxlength', '40', 'Value Properties')}"
      onchange="(e) => {console.log('Valor Modificado');}"
      options="${array('options', options, ',', 'Value Properties')}"
    >
      ${iconElement}
		</correos-ui-input>
  `.trim()

	//const $wcUiInput = el.querySelector('correos-ui-input');
  //$wcUiInput.addEventListener('eventChange', e => action('eventChange')(e.detail));
  /*
  $wcUiButton.addEventListener('onchange', e => {
		console.log('Valor cambiado');
  })
  */
	
	return el;
};