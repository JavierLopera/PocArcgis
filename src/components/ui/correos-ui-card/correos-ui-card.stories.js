/** Para documentar los eventos: https://storybook.js.org/docs/addons/introduction/ */
import { text, optionsKnob, boolean } from '@storybook/addon-knobs';
import ButtonReadme from './readme.md'

const dummyImage =  /*html*/`
	<svg slot="image" width="100px" height="63px" viewBox="0 0 159 97" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
		<title>Group 3 Copy 4</title>
		<desc>Created with Sketch.</desc>
		<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<g id="molecules/cards/type01/horizontal/hover" transform="translate(-28.000000, -23.000000)">
				<g id="Group-3-Copy-4" transform="translate(27.000000, 24.000000)">
					<path d="M22.9891945,55.255861 C-16.5847,54.7634934 -2.1641874,84.4296682 68.4570314,93.6378113 C139.07825,102.845954 179.723391,61.73342 148.024181,47.3552575 C116.324971,32.9770951 62.5630891,55.7482285 22.9891945,55.255861 Z" id="Path-2" fill="#ECECEC" transform="translate(80.139684, 68.777513) rotate(2.000000) translate(-80.139684, -68.777513) "></path>
					<g id="Group-7" transform="translate(38.000000, 0.000000)">
						<polygon id="Fill-20" fill="#FFFFFF" points="-2.3869795e-14 12.6232084 42.8543375 -1.20430972e-15 85.708675 12.6232084 42.8543375 25.2464169"></polygon>
						<polygon id="Stroke-22" stroke="#0E3C62" stroke-width="2.0384" stroke-linejoin="round" points="-2.3869795e-14 12.6232084 42.8543375 -1.20430972e-15 85.708675 12.6232084 42.8543375 25.2464169"></polygon>
						<polygon id="Fill-24" fill="#FFFFFF" points="85.7085353 12.6232084 42.8541978 25.2464169 42.8541978 79.3452767 85.7085353 61.3123234"></polygon>
						<polyline id="Stroke-26" stroke="#002453" stroke-width="2.0384" stroke-linejoin="round" points="85.7085353 12.6232084 42.8541978 25.2464169 42.8541978 79.3452767 85.7085353 61.3123234 85.7085353 12.6232084"></polyline>
						<polygon id="Fill-28" fill="#FFFFFF" points="2.8643754e-14 12.6232084 2.8643754e-14 61.3123234 42.8543375 79.3452767 42.8543375 25.2464169"></polygon>
						<polygon id="Fill-56" fill="#D7DCE5" points="2.8643754e-14 12.6232084 2.8643754e-14 61.3123234 42.8543375 79.3452767 42.8543375 25.2464169"></polygon>
						<polyline id="Stroke-30" stroke="#002453" stroke-width="2.0384" stroke-linejoin="round" points="2.8643754e-14 12.6232084 2.8643754e-14 61.3123234 42.8543375 79.3452767 42.8543375 25.2464169 2.8643754e-14 12.6232084"></polyline>
						<line x1="20.7585349" y1="18.7059605" x2="63.6128724" y2="6.08275211" id="Stroke-32" stroke="#002453" stroke-width="2.0384"></line>
						<polygon id="Fill-34" fill="#FFCE00" points="75.1445533 15.8060381 53.858532 22.0760072 53.858532 49.3025628 75.1445533 42.1286173"></polygon>
						<polyline id="Stroke-36" stroke="#002453" stroke-width="2.0384" points="75.1445533 15.8060381 53.858532 22.0760072 53.858532 49.3025628 75.1445533 42.1286173 75.1445533 15.8060381"></polyline>
					</g>
				</g>
			</g>
		</g>
	</svg>`

export default {
	title: 'correos-ui-card',
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
export const toolsCard = () => {

	const el = document.createElement('div');

	const slot = {
		text: text('[SLOT] text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'),
		disabled: boolean('disabled', false)
	}

	el.innerHTML = /*html*/`
		<div class="p-3x">
			<correos-ui-card tools ${slot.disabled ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}>
				<div slot="image"> ${dummyImage} </div>
				<p class="text-color-tint text-light " slot="text">${slot.text}</p>
			</correos-ui-card>
		</div>
	`.trim()

	return el;
};

export const directTools = () => {

	const el = document.createElement('div');

	const slot = {
		text: text('[SLOT] text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'),
		iconClassName: optionsKnob('[SLOT] icon',
			{
				'Default': 'display-none',
				'ico_almacen': 'ico_almacen',
				'ico_download': 'ico_download'
			},
			'ico_almacen',
			{ display: 'select' }
		),
		disabled: boolean('disabled', false)
	}

	el.innerHTML = /*html*/`
		<div class="p-3x">
			<correos-ui-card ${slot.disabled ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}>
				<i slot="icon" class="${slot.iconClassName}"></i>
				<p class="text-color-tint text-light" slot="text">${slot.text}</p>
			</correos-ui-card>
		</div>
	`.trim()

	return el;

};
