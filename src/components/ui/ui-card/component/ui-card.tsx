import { Component, Prop, h, Host } from '@stencil/core';

@Component({
	tag: 'correos-ui-card',
	styleUrls: ['ui-card.scss', 'ui-card.theme.scss'],
	shadow: false,
	scoped: true
})
export class UiCard {

	/**
	   * Valor (opcional) que permite habilitar o deshablitar el boton
	   */
	@Prop() disabled: boolean;

	/**  Valor (opcional) que permite indicar si es un link o un button  */
	@Prop() hrefLink?: string;

	render() {
		return (
			<Host>
				{this.hrefLink ?
					<a class="card" href={this.hrefLink}>
						<slot name="icon" />
						<slot name="image" />
						<slot name="text" />
					</a>
					: <button class="card" disabled={this.disabled}>
						<slot name="icon" />
						<slot name="image" />
						<slot name="text" />
					</button>
				}
			</Host>
		);
	}
}
