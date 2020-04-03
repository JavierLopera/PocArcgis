import { Component, Host, Event, h, getAssetPath, EventEmitter } from '@stencil/core';
import { ElementSizeListener } from '@app/utils';

@Component({
	tag: 'correos-cdk-tracking-card',
	styleUrl: 'correos-cdk-tracking-card.scss',
	shadow: true
})

export class CorreosCDKTrackingCard {
	prop: string = 'asdfasd';
	trackingCardSubmitHandler: (event: any) => void;

	@Event() formSubmit: EventEmitter;

	@ElementSizeListener()

	componentWillLoad() {
		//this.hasIconSlot = !!this.hostElement.querySelector('[slot="icon"]');
	}

	componentDidLoad() {
		this.trackingCardSubmitHandler = event => {
			event.preventDefault();
  			console.log(event, event.target[0].value)
			this.formSubmit.emit(event);
		};
	}

	componentDidUnload() {
	}

	componentDidRender() {
	}

	render() {

		return (
			<Host class="correos-cdk-tracking-card_root">
				<link rel="stylesheet" href={getAssetPath('./wc-ui.css')}></link>
				<form onSubmit={this.trackingCardSubmitHandler} id="tracking-card">
					<div class="correos-cdk-tracking-card_container">
						<slot name="titleSection"></slot>
						<correos-ui-input
							class=""
							label="Nº de seguimiento de envío"
						>
						</correos-ui-input>
						<slot name="helpSection"></slot>
					</div>
					<correos-ui-button
						type="submit"
						form="tracking-card"
					>
						<span slot="text">BUSCAR</span>
					</correos-ui-button>
				</form>
				<div class="cardsSection">
					<slot name="cardsSection"></slot>
				</div>
			</Host>
		);
	}
}
