import { Component, Prop, h } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
	tag: 'correos-ui-button',
	styleUrls: ['ui-button.theme.scss', 'ui-button.scss'],
	shadow: false,
	scoped: true
})
export class UiButton {
	/** Valor (opcional) que permite habilitar o deshablitar el boton */
	@Prop() disabled?: boolean;

	/** Valor (obligatorio si la propiedad disabled se ha proporcionado) que permite indicar que el area del boton esta deshabilitada */
	@Prop() ariaDisabled?: boolean = false;

	/** Valor (opcional) estilo del botón, Posibles valores: primary, secondary, default & ghost*/
	@Prop({ reflect: true }) theme?: string;

	/** Valor (opcional) Tema del botón. Posibles valores: tiny o link */
	@Prop({ reflect: true }) variant: string;

	/**  Valor (opcional) que permite indicar el tipo de boton  */
	@Prop() type?: string;

	/**  Valor (opcional) que indica la url de enlace  */
	@Prop() hrefLink?: string;

	rippleButtonElement!: HTMLButtonElement;
	rippleLinkElement!: HTMLAnchorElement;

	componentDidLoad() {
		if (this.rippleButtonElement) new MDCRipple(this.rippleButtonElement);
	}

	componentDidUnload() { }

	render() {
		return (
			<div class="mdc-touch-target-wrapper">
				{this.hrefLink ?
					<a class="mdc-button" href={this.hrefLink}
						ref={el => this.rippleLinkElement = el as HTMLAnchorElement}>
						<div class="mdc-button__ripple"></div>
						<slot name="icon-left" />
						<span class="mdc-button__label"><slot name="text" /></span>
						<slot name="icon-right" />
					</a> :
					<button disabled={this.disabled} type={this.type} class="mdc-button" area-disabled={this.ariaDisabled}
						ref={el => this.rippleButtonElement = el as HTMLButtonElement}>
						<div class="mdc-button__ripple"></div>
						<slot name="icon-left" />
						<span class="mdc-button__label"><slot name="text" /></span>
						<slot name="icon-right" />
					</button>}
			</div>
		);
	}
}
