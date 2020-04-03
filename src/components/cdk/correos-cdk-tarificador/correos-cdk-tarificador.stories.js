/** Para documentar los eventos: https://storybook.js.org/docs/addons/introduction/ */
import { text, boolean, optionsKnob } from '@storybook/addon-knobs';
import ButtonReadme from './readme.md'

export default {
    title: 'correos-cdk-tarificador',
    parameters: {
        readme: {
            // Show readme before story
            content: ButtonReadme,
            // Show readme at the addons panel
            sidebar: ButtonReadme,
        }
    }
};

// Main Button


export const tarificador = () => {

    const el = document.createElement('div');

    const slot = {
        title: text('[SLOT] title', 'Quiero enviar'),
        price: text('[SLOT] Price', 'A partir de: 0.80€')
    }

    el.innerHTML = /*html*/`
		<div class="p-3x">
            <correos-cdk-tarificador>
                <h3 slot="title" class="text-headline-3 text-light text-color-tint"> ${slot.title}</h3>
                <p slot="minimo" class="text-headline-3 text-light text-color-default"> ${slot.price}</p>
			</correos-cdk-tarificador>
		</div>

	`.trim()

    const $wcUiButton = el.querySelector('correos-cdk-tarificador');
    // $wcUiButton.addEventListener('click', e => action('click')(e.detail))
    // $wcUiButton.addEventListener('click', e => {
    //     console.log('click');
    // })

    return el;

};
