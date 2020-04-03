import { Component, h, Host, Prop } from '@stencil/core';
import { tns } from "../../../../../node_modules/tiny-slider/src/tiny-slider";

@Component({
	tag: 'correos-cdk-section-slider',
	styleUrls: ['cdk-section-slider.scss', 'cdk-section-slider.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKSectionSlider {

	$slider!: HTMLElement
	TNSInstance: any;

	/* (opcional) Velocidad en fotogramas del desplazamiento del slider */
	@Prop() speedSlider: number = 300;

	/* (opcional) Inidica si el slider comienza a desplazarse de manera automaticamente */
	@Prop() autoplaySlider: boolean = false;

	/* (opcional) Inidica si se debe centrar en vista mobile*/
	@Prop() centerOnMobile: boolean;

	/* (opcional) Indica si el desplazamiento del slider es circular */
	@Prop() loopSlider: boolean = false;

	/* (opcional) Indica el numero de elementos a mostrar en vista mobile */
	@Prop() itemMobileSlider: number = 2;

	/* (opcional) Indica el numero de elementos a mostrar en vista tablet */
	@Prop() itemTabletSlider: number = 4;

	/* (opcional) Indica el numero de elementos a mostrar en vista desktop */
	@Prop() itemDesktopSlider: number = 6;

	/** (opcional) Valor (opcional) estilo del title --> true: center; false: start */
	@Prop({ reflect: true }) variant: string;

	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() {
		this.TNSInstance = tns({
			container: this.$slider,
			"slideBy": "page",
			"mouseDrag": true,
			"speed": this.speedSlider,
			"nav": false,
			"controls": false,
			autoplay: this.autoplaySlider,
			gutter: 16,
			loop: this.loopSlider,
			responsive: {
				0: {
				  items: this.itemMobileSlider,
				  center: this.centerOnMobile
				},
				640: {
				  items: this.itemTabletSlider,
				  center: this.centerOnMobile
				},
				1024: {
				  items: this.itemDesktopSlider,
				  center: false
				}
			}
		} as any);
		this.TNSInstance.play();
	}

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() {
		this.TNSInstance = null;
	}

	render() {
		return (
			<Host>
				<section class="cdk-root">
					<slot name="title" />
					<div ref={(el) => this.$slider = el as HTMLElement} class={{
						'cdk-slider': true,
						'--center-mobile': this.centerOnMobile
					}}>
						<slot name="slider" />
					</div>
				</section>
			</Host>
		);
	}
}
