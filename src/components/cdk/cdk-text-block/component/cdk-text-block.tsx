import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';
import { structure } from '../models/cdk-text-block.model';

@Component({
	tag: 'correos-cdk-text-block',
	styleUrls: ['cdk-text-block.scss', 'cdk-text-block.theme.scss'],
	shadow: false,
	scoped: true
})
export class CdkTextBlock {

	/** Escucha los cambios en el width/height del Host del Custom element y setea el atributo "size" */
	@ElementSizeListener({ sm: 620 })
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint

	/** Array de objetos con el siguiente tipado: { title: string; body: string; }*/
	@Prop() literals: string;
	@Watch('literals') parseLiterals(newLiterals: string) {
		if (newLiterals) {
			try { this._literals = JSON.parse(newLiterals); }
			catch (e) { }
		}
	}

	@State() _literals: structure[]

	componentWillLoad() {
		this.parseLiterals(this.literals);
	}

	componentDidLoad() {
	}

	componentDidUnload() {
	}

	render() {
		return (
			<Host>
				<div><slot name="title" /></div>
				<div class="cdk-line"></div>
				<div class="cdk-container">
					{this._literals.map((res: structure) =>
						<div class="cdk-notice">
							<p class="cdk-notice-title">{res?.title}</p>
							<p class="cdk-notice-text">{res?.body}</p>
						</div>
					)}
				</div>
				<slot name="link" />

			</Host>
		);
	}
}
