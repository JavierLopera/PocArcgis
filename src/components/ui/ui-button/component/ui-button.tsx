import { Component, Prop, h } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
	tag: 'correos-ui-button',
	styleUrl: 'ui-button.scss',
	shadow: false,
	scoped: true
})
export class UiButton {
  /**
	 * Valor (opcional) que permite asignar un formulario al que se hará submit
	 */
	@Prop() form: string;

	/**
	 * Valor (opcional) que permite habilitar o deshablitar el boton
	 */
	@Prop() disabled: boolean;

	/**
	 * Valor (opcional) que permite indicar el tipo de boton
	 */
	@Prop() type: string;

	rippleButtonElement!: HTMLButtonElement;

	componentDidLoad() {
		new MDCRipple(this.rippleButtonElement);
	}

	render() {
		console.log(this.form);
		return (
			<div class="mdc-touch-target-wrapper">
				<button disabled={this.disabled} type={this.form ? 'submit' : this.type} class="mdc-button" form={this.form}
					ref={el => this.rippleButtonElement = el as HTMLButtonElement}>
					<div class="mdc-button__ripple"></div>
					<slot name="icon-left" />
					<span class="mdc-button__label"><slot name="text" /></span>
					<slot name="icon-right" />
				</button>
			</div>
		);
	}
}
