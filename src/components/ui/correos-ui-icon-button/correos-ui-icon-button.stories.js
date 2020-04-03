/** Para documentar los eventos: https://storybook.js.org/docs/addons/introduction/ */
import { action } from '@storybook/addon-actions';
import { text, optionsKnob, boolean } from '@storybook/addon-knobs';
import ButtonReadme from './readme.md'

export default {
    title: 'correos-ui-icon-button',
    parameters: {
        readme: {
            // Show readme before story
            content: ButtonReadme,
            // Show readme at the addons panel
            sidebar: ButtonReadme
        }
    }
};

export const iconButton = () => {
    const el = document.createElement('div');

    const icon = {
        iconClass: optionsKnob('[SLOT] icon',
            {
                'ico_download': 'ico_download',
                'ico_arrow': 'ico_arrow',
                'ico_notif_info': 'ico_notif_info'
            },
            'ico_download',
            { display: 'select' }
        ),
        attr: optionsKnob('Tipo',
            {
                'Default': '',
                'Primary': 'primary',
                'Secondary': 'secondary',
                'Ghost': 'ghost'
            },
            'primary',
            { display: 'select' }
        ),
        disabled: boolean('Disabled', false),
    }

    el.innerHTML = /*html*/ `
        <div class="p-3x">
            <correos-ui-icon-button 
                ${icon.attr}
                ${icon.disabled ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}
                ariaLabel="${text('AriaLabel', 'download')}"
            >
            <i slot="icon" class="${icon.iconClass}"></i>
            </correos-ui-icon-button>
        </div>
    `.trim()

    const $wcUiIconButton = el.querySelector('correos-ui-icon-button');
    // $wcUiIconButton.addEventListener('click', e => action('click')(e.detail))
    $wcUiIconButton.addEventListener('click', e => {
        console.log('click');
	})

    return el;

};

