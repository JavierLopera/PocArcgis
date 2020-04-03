import { Component, Host, h, Prop } from '@stencil/core';

@Component({
	tag: 'correos-cdk-imageblock',
	styleUrls: ['cdk-imageblock.scss', 'cdk-imageblock.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKImageblock {

	/* Url image */
	@Prop() urlImage: string = '';

	/* Alt image */
	@Prop() altImage: string = '';

	render() {
		return (
			<Host>
				<figure>
					<img src={this.urlImage} alt={this.altImage}></img>
				</figure>
			</Host>
		);
	}
}
