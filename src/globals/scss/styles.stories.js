/** Para documentar los eventos: https://storybook.js.org/docs/addons/introduction/ */
import { action } from '@storybook/addon-actions';
import { text, boolean, optionsKnob } from '@storybook/addon-knobs';
export default {
    title: 'correos-global-styles',
    parameters: {

    }
};

// Main Button


export const wrappers = () => {
	const el = document.createElement('div');
	el.innerHTML = /*html*/`
		<div class="wrapper-main bg-color p-2x mt-4x">
			wrapper-main permite centrar el contenido respetando el ancho máximo definido
		</div>
	`.trim()
	return el;
};

export const grid = () => {
	const el = document.createElement('div');
	el.innerHTML = /*html*/`
		<div class="wrapper-main text-color-tint">
			<div class="row mt-4x">
				<div class="col-4 p-2x bg-color">col-4</div>
				<div class="col-3 p-2x bg-color">col-3</div>
				<div class="col-3 p-2x bg-color">col-3</div>
				<div class="col-1 p-2x bg-color">col-1</div>
				<div class="col-1 p-2x bg-color">col-1</div>
			</div>
			<div class="row mt-4x">
				<div class="col-offset-2 p-2x col-2 bg-color">col-offset-2 col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
			</div>
			<div class="row mt-4x">
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
			</div>
		</div>
	`.trim()
	return el;
};

export const spacing = () => {
	const el = document.createElement('div');
	el.innerHTML = /*html*/`
		<div class="wrapper-main text-color-tint">
			<div class="row mt-4x">
				<div class="col-4 p-2x bg-color">col-4</div>
				<div class="col-3 p-2x bg-color">col-3</div>
				<div class="col-3 p-2x bg-color">col-3</div>
				<div class="col-1 p-2x bg-color">col-1</div>
				<div class="col-1 p-2x bg-color">col-1</div>
			</div>
			<div class="row mt-4x">
				<div class="col-offset-2 p-2x col-2 bg-color">col-offset-2 col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
				<div class="col-2 p-2x bg-color">col-2</div>
			</div>
			<div class="row mt-4x">
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
				<div class="col-12 md:col-6 lg:col-3 p-2x bg-color">col</div>
			</div>
		</div>
	`.trim()
	return el;
};
