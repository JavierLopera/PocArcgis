import { Component, Host, h, Prop } from '@stencil/core';

@Component({
	tag: 'correos-cdk-section-bgimagecard',
	styleUrls: ['cdk-section-bgimagecard.scss', 'cdk-section-bgimagecard.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKSectionBgimagecard {

	/** Image src url */
	@Prop() bgImage: string = '';


	render() {
		const image = { 'background-image': `url(${this.bgImage})` }
		return (
			<Host>
				<div class="cdk-root">
					<div class="cdk-img" style={image}></div>
					<div class="cdk-content">
						<div class="cdk-textblock">
							<slot name="textblock" />
						</div>
					</div>
				</div>
			</Host>
		);
	}
}
