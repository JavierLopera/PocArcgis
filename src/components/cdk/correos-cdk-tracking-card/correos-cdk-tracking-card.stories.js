/** Para documentar ejemplos de entrada: https://github.com/storybookjs/storybook/tree/master/addons/knobs */
import { array, text, boolean } from '@storybook/addon-knobs';
import TrackingCardReadme from './readme.md'

export default {
  title: 'correos-cdk-tracking-card',
	parameters: {
		readme: {
			// Show readme before story
			content: TrackingCardReadme,
			// Show readme at the addons panel
			sidebar: TrackingCardReadme,
		}
	}
}

export const CustomElement = () => {

	/** Create element */
  const el = document.createElement('div');

  /* Title slot */
  let titleSlot = document.createElement('span');
  titleSlot.slot = "titleSection";
  titleSlot.innerHTML = "Sigue tu envío";
  /* Help slot */
  const helpElement = 
    '¿Dónde está mi número de envío?'+
    '<i class="material-icons">info</i>';
  let helpSlot = document.createElement('a');
  helpSlot.slot = "helpSection";
  helpSlot.style= "display: flex;align-items: center;";
  helpSlot.innerHTML = helpElement;
  /* Cards slot */
  const cardElement = 
    '<correos-ui-card style="display: contents;">'+
      '<i slot="icon" class="Default"></i>'+
      '<i slot="image" class="primary"></i>'+
      '<span slot="text">Lorem ipsum dolor sit amet</span>'+
    '</correos-ui-card>';
  let cardsSlot = document.createElement('div');
  cardsSlot.slot = "cardsSection";
  cardsSlot.style = "display: flex;flex-direction: column;"
  cardsSlot.innerHTML = cardElement + cardElement + cardElement;

  /** Set inner HTML template */
  el.innerHTML = /*html*/`
		<correos-cdk-tracking-card
      onsubmit="valor => {console.log('Valor enviado!',valor);}"
    >
      ${titleSlot.outerHTML}
      ${helpSlot.outerHTML}
      ${cardsSlot.outerHTML}
		</correos-cdk-tracking-card>
  `.trim()

	const $wcUiInput = el.querySelector('correos-cdk-tracking-card');
  $wcUiInput.addEventListener('formSubmit', e => action('formSubmit')(e.detail));

	const $wcUiTrackingCard = el.querySelector('correos-cdk-tracking-card a[slot="helpSection"]');
  $wcUiTrackingCard.addEventListener('click',() => { alert('¡En construcción!'); } );
	
	return el;
};