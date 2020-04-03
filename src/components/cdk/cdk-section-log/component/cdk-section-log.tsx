import { Component, Prop, Host, h } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-cdk-section-log',
	styleUrls: ['cdk-section-log.scss', 'cdk-section-log.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKSectionLog {

	/** Escucha los cambios en el width/height del Host del Custom element y setea el atributo "size" */
	@ElementSizeListener({ sm: 800 })
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint

	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() { }

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() { }

	render() {
		return (
			<Host>
				<div class="cdk-header"><slot name="inf" /></div>
				<div class="cdk-log">
					<div class="cdk-log__signup"><slot name="signup" /></div>
					<div class="cdk-log__login"><slot name="login" /></div>
				</div>
			</Host>
		);
	}
}
