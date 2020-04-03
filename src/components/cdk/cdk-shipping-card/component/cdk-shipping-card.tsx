import { Component, Host, Event, Prop, h, State, EventEmitter } from '@stencil/core';
import { trackingPointsElement } from 'src/components/ui/ui-tracking-stepper/models/ui-tracking-stepper.model';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-cdk-shipping-card',
	styleUrls: ['cdk-shipping-card.theme.scss', 'cdk-shipping-card.scss'],
	shadow: false,
	scoped: true
})

export class CdkShippingCard {

	@ElementSizeListener({ sm: 720 })
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint
	
	/* Variable que controlará el estado visual de la sección del detalle del seguimiento */
	@State() detailOpened: boolean;

	/* Indicador de si el envio está activo como favorito */
	@Prop() favourite: boolean;

	/* Número de seguimiento */
	@Prop() track_number: string;

	/** Nombre de la compañia  */
	@Prop() company_name: string;

	/** Fecha de la entrega */
	@Prop() delivery_date: string;

	/** Número de bultos que contiene el envio */
	@Prop() items: number;

	/* Puntos de siguimiento */
	@Prop() points: trackingPointsElement[] | string | any;

	/** CustomEvent para controlar el cambio del estado de la propiedad favorito */
	@Event() switchFavouriteItem: EventEmitter;

	/** CustomEvent para controlar la edición del envio */
	@Event() editShipment: EventEmitter;

	loveItemHandler = (e: MouseEvent) => {
		e.preventDefault();
		this.switchFavouriteItem.emit(!this.favourite ? 'true' : 'false');
		this.favourite = !this.favourite;
	};

	editShipmentHandler = event => {
		event.preventDefault();
		this.editShipment.emit('Clicked!');
	};

	toggleDetailHandler = event => {
		event.preventDefault();
		this.detailOpened = !this.detailOpened;
	};

	componentDidLoad() { }

	componentDidUnload() { }

	render() {
		return (
			<Host class={`cdk-shipping-card-root ${this.detailOpened && 'detailSectionOpened'}`}>

				<div class="cdk-shipping-card-header">
					<div class="cdk-shipping-card-header__tracking_number">
						<i class={`cdk-shipping-card-header__tracking_number--icon ${this.favourite ? 'icon-favourite_on' : 'icon-favourite_off'}`} tabindex="0" role="button" onClick={e => this.loveItemHandler(e)}>
						</i>
						<div class="cdk-shipping-card-header__tracking_number_block">
							<span class="cdk-shipping-card-header__tracking_number_block--id">{this.track_number}</span>
							<span class="cdk-shipping-card-header__tracking_number_block--company">{this.company_name}</span>
						</div>
					</div>
					<span class="cdk-shipping-card-header__manage" tabindex="0" role="button" onClick={e => this.editShipmentHandler(e)}>GESTIONAR ENVÍO</span>
				</div>
				<div class="cdk-shipping-card-container">
					<correos-ui-tracking-stepper class="cdk-stepper" type="horizontal" points={this.points} />
					<div class="cdk-shipping-card-container__dateitems">
						<div class="cdk-shipping-card-container__dateitems--date">
							<span class="cdk-shipping-card-container__dateitems--date-title">Fecha de entrega:</span>
							<span class="cdk-shipping-card-container__dateitems--date-value">{this.delivery_date}</span>
						</div>
						<div class="cdk-shipping-card-container__dateitems--items">
							<div class="cdk-shipping-card-container__dateitems--items__bundle">
								<i class="cdk-shipping-card-container__dateitems--items-box_icon icon-tosend_blue" />
								<span class="cdk-shipping-card-container__dateitems--items-packages">{this.items && this.items > 1 ? this.items + ' bultos' : this.items + ' bulto'}</span>
							</div>
							<i class={`cdk-shipping-card-container__dateitems--items-icon ${this.detailOpened ? 'icon-drop transform' : 'icon-drop'}`} tabindex="0" role="button" onClick={e => this.toggleDetailHandler(e)}>
							</i>
						</div>
					</div>
				</div>
				<div class="cdk-shipping-card-detail">
					<div class="row">
						<correos-ui-tracking-stepper class="col-12 lg:col-offset-1 lg:col-5" type="vertical" points={this.points} />
					</div>
				</div>
			</Host>
		);
	}
}
