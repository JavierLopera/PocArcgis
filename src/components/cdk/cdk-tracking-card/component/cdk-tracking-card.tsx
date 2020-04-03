import { Component, Host, Event, h, EventEmitter, Prop, Watch, State } from '@stencil/core';
import { formSubmit, CdkTrackingCardThemes } from '../models/cdk-tracking-card.model';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';

@Component({
	tag: 'correos-cdk-tracking-card',
	styleUrls: ['cdk-tracking-card.scss', 'cdk-tracking-card.theme.scss'],
	shadow: false,
	scoped: true
})

export class CdkTrackingCard {

	@ElementSizeListener({ sm: 608, md: 1023 }) 
	@Prop({mutable: true, reflect: true}) size: IElementSizeListenerBreakpoint

	/** Literals */
	@Prop() literals: string;
	@Watch('literals') parseLiterals(newLiterals: string) {
		if (newLiterals) {
			try { this._literals = JSON.parse(newLiterals); }
			catch (e) { }
		}
	}

	/** Component available themes. Posibles valores: primary, ghost & default */
	@Prop() theme: CdkTrackingCardThemes;

	/* This property is necessary if you want to control the form through a form action.
	* By default an event will be emitted to the parent that can be captured (formSubmitOutput)*/
	@Prop() urlForm: string = '';

	/** Event submit output, No es una propiedad. Este evento devuelve el valor del formulario una vez se ha realizado el evento de submit.
	 * Este evento solo debera ser capturado en caso de que no se pase la propiedad urlForm.
	 */
	@Event() formSubmitOutput: EventEmitter;

	@State() _literals: { [key: string]: any }
	formSubmit: formSubmit = {}

	componentWillLoad() {
		this.parseLiterals(this.literals);
	}

	componentDidLoad() { }

	componentDidUnload() { }

	tracingCardsubmit(e: any) {
		e.preventDefault();
		const form = new FormData(e.target);
		form.forEach((value: string, key: string) => {
			this.formSubmit[key] = value;
		});
		this.formSubmitOutput.emit(this.formSubmit);
	}

	render() {
		const structureForm= (
			<div class="cdk-container-form">
				<fieldset class="cdk-fieldset">
					<correos-ui-input
						class="cdk-control"
						name="tracking-number"
						label={this._literals?.searchFieldLabel || '[searchFieldLabel]'}
						aria-label={this._literals?.searchFieldLabel || '[searchFieldLabel]'}
						required
						type="text"
					>
					</correos-ui-input>
				</fieldset>
				<correos-ui-button
					class="cdk-submit"
					type="submit"
					aria-label={this._literals?.buttonSubmitTxT || '[buttonSubmitTxT]'}
					aria-disabled="false"
					theme="secondary"
					variant={this.size === 'sm' ? 'tiny' : 'no-icons'}
				>
					<i slot="icon-left" class="icon-search"></i>
					<span slot="text">{this._literals?.buttonSubmitTxT || '[buttonSubmitTxT]'}</span>
				</correos-ui-button>
			</div>);
		return (
			<Host>
				<div class="cdk-tracking-card">
					<div class="cdk-form-container">
						<slot name="title" />
						{this.urlForm.length > 0 ?
							<form
								autocomplete="off"
								class="cdk-form"
								id="tracking-card"
								method="get"
								enctype="application/x-www-form-urlencoded"
								action={this.urlForm}
							>
								{structureForm}
							</form>
							: <form
								autocomplete="off"
								class="cdk-form"
								id="tracking-card"
								onSubmit={e => this.tracingCardsubmit(e)}
							>
								{structureForm}
							</form>
						}
						<div class="cdk-help-text-container">
							<slot name="help-text" />
							<i slot="icon-left" class="icon-notif_info cdk-help-text-icon"></i>
						</div>

					</div>

					<div class="cdk-tools">
						<slot name="tool-first" />
						<slot name="tool-second" />
						<slot name="tool-third" />
					</div>

				</div>
			</Host>
		);
	}
}
