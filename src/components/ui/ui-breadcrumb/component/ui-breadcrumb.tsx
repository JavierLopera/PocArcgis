import { Component, Host, h, Prop, Watch, State, } from '@stencil/core';
import { BreadcrumbInterface } from '../models/ui-breadcrumb.model';

@Component({
	tag: 'correos-ui-breadcrumb',
	styleUrls: ['ui-breadcrumb.scss', 'ui-breadcrumb.theme.scss'],
	shadow: false,
	scoped: true
})
export class UiBreadcrumb {

	/** Valor (opcional) Tema del breadrumb -- Variant="white" */
	@Prop({ reflect: true }) variant: string;

	@Prop() literals: string;
	@Watch('literals') parseLiterals(newLiterals: string) {
		if (newLiterals) {
			try {
				this._literals = JSON.parse(newLiterals);
			}
			catch (e) {
				console.error(e)
			}
		}
	}
	@State() _literals: { [key: string]: any } = [{}]

	componentDidLoad() {
		this.parseLiterals(this.literals);
	}

	render() {
		return (
			<Host>
				<ul class="cdk-list-container">
					{this._literals.map((res: BreadcrumbInterface, i: number) =>
						<li class="cdk-list-container__items">
							{i == this._literals.length - 1
								? <div>{res.name}</div>
								: <a class="cdk-list-container__items-ref" href={res.href}>{res.name}</a>}
						</li>
					)}
				</ul>
			</Host>
		);
	}
}
