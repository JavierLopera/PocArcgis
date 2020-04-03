import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'correos-ui-card',
	styleUrl: 'correos-ui-card.scss',
	shadow: true,
})
export class CorreosUiCard {

	/**
	 * Valor (opcional) que permite habilitar o deshablitar el boton
	 */
	@Prop() disabled: boolean;
	
	render() {
		return (
			<button class="card" disabled={this.disabled}>
				<slot name="icon" />
				<slot name="image" />
				<slot name="text" />
			</button>
		);
	}
}
