import { Component, Host, h, Prop } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-cdk-core-footer',
	styleUrls: ['cdk-core-footer.scss', 'cdk-core-footer.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKCoreFooter {

	/** Escucha los cambios en el width/height del Host del Custom element y setea el atributo "size" */
	@ElementSizeListener({ sm: 1023, md: 1366 })
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint

	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() { }

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() { }

	render() {
		
		return (
			<Host>
				<div class="cdk-body">
					<div><slot name="social" /></div>
					<div class="cdk-body__no-social">
						<div><slot name="links" /></div>
						<div><slot name="iconcorreos" /></div>
					</div>
				</div>
				<div><slot name="footer" /></div>
			</Host>
		);
	}
}
