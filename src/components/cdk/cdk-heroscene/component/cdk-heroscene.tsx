import { Component, h, Host, Prop } from '@stencil/core';
import { CDKHeroSceneDecorativeEnd } from './cdk-heroscene.fragments';

@Component({
	tag: 'correos-cdk-heroscene',
	styleUrls: ['cdk-heroscene.scss', 'cdk-heroscene.theme.scss'],
	shadow: false,
	scoped: true
})
export class CdkHeroscene {
	
	/** Image src url */
	@Prop() bgImage: string = '';

	/** Bg color for next section */
	@Prop() afterBgColor: string;

	/** Max content width in EM units */
	@Prop() contentMaxWidth: string;

	render() {
		const image = { 'background-image': `url(${this.bgImage})` }
		return (
			<Host style={{
				'--cdk-heroscene-background-color-end': this.afterBgColor,
				'--cdk-heroscene-content-max-width': this.contentMaxWidth
			}}>
				<section class="cdk-wrapper">
					<div class="cdk-image" style={image}>
						<CDKHeroSceneDecorativeEnd className="cdk-image-end" color={this.afterBgColor} />
					</div>

					<div class="cdk-content-container">
						<div class="cdk-content-box">
							<slot name="pretext" />
							<slot name="title" />
							<slot name="description" />
							<slot name="button"/> 
						</div>
					</div>

					<CDKHeroSceneDecorativeEnd className="cdk-content-end" color={this.afterBgColor} />
				</section>

				<section class="cdk-cta">
					<div class="cdk-cta-container wrapper-main">
						<slot name="call-to-action" />
					</div>
				</section>

			</Host>
		);
	}

}

