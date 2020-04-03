import { Component, Prop, h, Host } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-ui-card-large',
	styleUrls: ['ui-card-large.scss', 'ui-card-large.theme.scss'],
	shadow: false,
	scoped: true
})
export class UiCardLarge {

	/** Escucha los cambios en el width/height del Host del Custom element y setea el atributo "size" */
	@ElementSizeListener()
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint;

	/**
	* Valor (opcional) que permite habilitar o deshablitar el boton
	*/
	@Prop() disabled: boolean;

	/** Valor (opcional) Tema de la card */
	@Prop({ reflect: true }) variant: string;

	/**  Valor (opcional) que permite indicar si es un link o un button  */
	@Prop() hrefLink?: string;

	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() { }

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() { }

	render() {
		return (
			<Host>
				{this.hrefLink ?
					<a class="card" href={this.hrefLink}>
						<slot name="image" />
						<div class="content">
							<slot name="title" />
							<div class="divisor"></div>
							<slot name="body-text" />
							<slot name="footer" />
						</div>
					</a>
					: <button class="card" disabled={this.disabled}>
						<slot name="image" />
						<div class="content">
							<slot name="title" />
							<div class="divisor"></div>
							<slot name="body-text" />
							<slot name="footer" />
						</div>
					</button>}
			</Host>
		);
	}

}
