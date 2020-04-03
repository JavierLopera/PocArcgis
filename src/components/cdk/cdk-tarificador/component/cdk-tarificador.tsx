import { Component, h, Host, Event, EventEmitter, Prop, Watch, State } from '@stencil/core';
import { ElementSizeListener, IElementSizeListenerBreakpoint } from '@app/utils';
import { formSubmit, literalsS } from '../models/cdk-tarificador.model';

@Component({
	tag: 'correos-cdk-tarificador',
	styleUrls: ['cdk-tarificador.scss', 'cdk-tarificador.theme.scss'],
	shadow: false,
	scoped: true
})
export class CdkTarificador {

	@ElementSizeListener({ sm: 520, md: 1023 })
	@Prop({ mutable: true, reflect: true }) size: IElementSizeListenerBreakpoint

	/* This property is necessary if you want to control the form through a form action.
	* By default an event will be emitted to the parent that can be captured (formSubmitOutput)*/
	@Prop() urlForm: string = '';

	/** Array de objetos con el siguiente tipado: {inputLabelOrigin: string; inputLabelDestination: string; inputLabelContent: string; inputLabelQuantity: string; buttontext: string;}*/
	@Prop() literals: string;
	@Watch('literals') parseLiterals(newLiterals: string) {
		if (newLiterals) {
			try { this._literals = JSON.parse(newLiterals); }
			catch (e) { }
		}
	}

	@State() _literals: literalsS;

	/** Event submit output, No es una propiedad. Este evento devuelve el valor del formulario una vez se ha realizado el evento de submit.
	 * Este evento solo debera ser capturado en caso de que no se pase la propiedad urlForm.
	 */
	@Event() formSubmitOutput: EventEmitter;

	formSubmit: formSubmit = {}

	Tarificadorsubmit(e) {
		e.preventDefault();
		const form = new FormData(e.target);

		form.forEach((value: string, key: string) => {
			this.formSubmit[key] = value;
		});
		this.formSubmitOutput.emit(this.formSubmit);
	}

	componentWillLoad() {
		this.parseLiterals(this.literals);
	}

	componentDidLoad() {
	}

	componentDidUnload() {
	}

	render() {

		const structureForm = (
			<div class="form-container__main">
				<div class="form-container-inf">
					<div class="form-container-inputs">
						<div class="form-container-inputs__primary">
							<correos-ui-input class="form-container-inputs__primary--input"
								label={this._literals.inputLabelOrigin}
								type="text"
								name="origin"
							>
							</correos-ui-input>
							<correos-ui-input class="form-container-inputs__primary--input"
								label={this._literals.inputLabelDestination}
								type="text"
								name="destination"
							>
							</correos-ui-input>
						</div>
						<div class="form-container-inputs__secondary">
							<correos-ui-input class="form-container-inputs__secondary--input"
								label={this._literals.inputLabelContent}
								type="text"
								name="content"
							>
							</correos-ui-input>
							<correos-ui-input class="form-container-inputs__secondary--input"
								label={this._literals.inputLabelQuantity}
								pattern="^[0-9]+$"
								type="number"
								name="quantity"
							>
							</correos-ui-input>
						</div>
					</div>
					<slot name="text" />
				</div>
				<correos-ui-button theme="primary"
					class="form-container__button-submit"
					type="submit"
					aria-disabled="false"
				>
					<span slot="text">{this._literals.buttonText}</span>
				</correos-ui-button>
			</div>);

		return (
			<Host>
				<div><slot name="title" /></div>
				{this.urlForm.length > 1
					?
					<form class="form-container"
						method="get"
						action={this.urlForm}
					> {structureForm}
					</form>
					:
					<form class="form-container"
						method="get"
						onSubmit={e => this.Tarificadorsubmit(e)}
					> {structureForm}
					</form>
				}
			</Host>
		);
	}

}

