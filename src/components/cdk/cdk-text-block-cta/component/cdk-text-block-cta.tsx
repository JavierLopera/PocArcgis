import { Component, Host, h, Prop } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-cdk-text-block-cta',
	styleUrls: ['cdk-text-block-cta.scss', 'cdk-text-block-cta.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKTextBlockCta {

	/** Escucha los cambios en el width/height del Host del Custom element y setea el atributo "size" */
	@ElementSizeListener()
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint

	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() { }

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() { }

	render() {
		return (
			<Host>
				<div><slot name="header" /></div>
				<div><slot name="title" /></div>
				<div><slot name="text" /></div>
				<div><slot name="link" /></div>
			</Host>
		);
	}
}
