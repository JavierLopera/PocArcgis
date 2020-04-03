import { Component, Prop, Host, h } from '@stencil/core';
import { CDKSectionBoxDecorativeStart, CDKSectionBoxDecorativeEnd } from './cdk-section-box.fragments';

@Component({
	tag: 'correos-cdk-section-box',
	styleUrls: ['cdk-section-box.scss', 'cdk-section-box.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKSectionBox {
	
	/** Bg color of back section */
	@Prop() beforeBgColor: string;

	/** Bg color of next section */
	@Prop() afterBgColor: string;

	/** Bg color of global section */
	@Prop() BgColor: string;

	/** Bg image for decorations */
	@Prop() BgImage: string;

	/** Section box without wrapperMain */
	@Prop() fullWidth: boolean;

	render() {
		return (
			<Host style={{
				'--cdk-section-box-background-color-start': this.beforeBgColor || 'transparent',
				'--cdk-section-box-background-color-end': this.afterBgColor || 'transparent',
				'--cdk-section-box-background-color': this.BgColor || 'transparent',
				'--cdk-section-box-background-image': this.BgImage ? `url(${this.BgImage})` : ''
			}}> 
				<CDKSectionBoxDecorativeStart className="cdk-content-start" color={this.beforeBgColor} />
				<div class="cdk-content">
					<div class={`${this.fullWidth ? '' :'wrapper-main'}`}>
						<slot name="block"></slot>
					</div>
				</div>
				<CDKSectionBoxDecorativeEnd className="cdk-content-end" color={this.afterBgColor} />
				<div class="cdk-section-box-root">					
				</div>
			</Host>
		);
	}
}
