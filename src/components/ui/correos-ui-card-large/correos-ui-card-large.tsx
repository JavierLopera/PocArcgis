import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'correos-ui-card-large',
    styleUrl: 'correos-ui-card-large.scss',
    shadow: true
})
export class CorreosUiCardType01 {

	/**
	 * Valor (opcional) que permite habilitar o deshablitar el boton
	 */
	@Prop() disabled: boolean;
    
    render() {

        // TODO: Deberia la imagen ajustarse en tamaño en funcion de la resolucion?
        return (
            <button class="card" disabled={this.disabled}>
                <slot name="image" /> 
                <div class="content">
                    <slot name="title" />
                    <div class="divisor"></div>
                    <slot name="body-text" />
                    <slot name="footer" />
                </div>
            </button>

        );
    }

}
