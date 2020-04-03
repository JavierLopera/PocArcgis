import { Component, State, Element, Event, h, Prop, EventEmitter } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { MDCTextField } from '@material/textfield';

@Component({
	tag: 'correos-ui-input',
	styleUrl: 'correos-ui-input.scss',
	shadow: false
})
export class CorreosUiInput {
	/*
		- Las validaciones se basan siempre en el estado actual del Input
		- Se tiene que incluir función de custom errors y sus mensajes
		- Falta la siguiente lista de atributos nativos a implementar:
			min and max
			multiple
			step
		- Los eventos se han mapeado de forma dinámica. Eventos que no se han includo:
			oncontextmenu	script	Script to be run when a context menu is triggered
			onreset	script	Fires when the Reset button in a form is clicked
			onsearch	script	Fires when the user writes something in a search field (for <input="search">)
	*/
	validEventsList = ['onblur', 'onchange', 'oncontextmenu', 'onfocus', 'oninput', 'oninvalid',
		'onreset', 'onsearch', 'onselect', 'onmouseover', 'onmouseout'];


	/**
	 * Valor del campo input
	 */
	@Prop() value: string;
	/**
	 * Valor de la etiqueta
	 */
	@Prop() label: string = 'Label';
	/**
	 * Tipo del campo input
	 */
	@Prop() type: string = 'text';
	/**
	 * Flag para indicar la obligatoriedad del campo
	 */
	@Prop() required: boolean;
	/**
	 * Patrón de validación
	 */
	@Prop() pattern: string;
	/**
	 * Carácteres mínimos que debe tener el valor del campo input
	 */
	@Prop() minlength: string;
	/**
	 * Carácteres máximos que debe tener el valor del campo input
	 */
	@Prop() maxlength: string;
	/**
	 * Texto del marcado o información del campo
	 */
	@Prop() placeholder: string;
	/**
	 * Icono a mostrar en el encabezado
	 */
	@Prop() icon: string;
	/**
	 * Flag para indicar que coja el foco al renderizarse
	 */
	@Prop() autofocus: boolean;
	/**
	 * Flag para indicar que coja el foco al renderizarse
	 */
	@Prop() options: string;

	/**
	 * Descripción del evento
	 */
	@Event() eventChange: EventEmitter;
	/**
	 * Elemento del DOM a insertar
	 */
	@Element() hostElement: HTMLStencilElement;

	@State() trailingIconType: string = "cancel";
	@State() textInputFilled: boolean = false;

	textFieldMDC: MDCTextField;
	textFieldMDCElement: HTMLInputElement;
	textInputElement: HTMLInputElement;
	textFieldIconMDCElement: HTMLInputElement;
	iconTrailingElement: HTMLInputElement;
	menu: HTMLCorreosUiMenuElement;
	hasIconSlot: boolean;
	nativeEvents: { type: string, callback: any }[] = [];
	finalId = `correos-ui-input_${(Math.random() * (100000)).toPrecision(5)}`;

	// Eventos
	clickEvent = () => {
		if (this.trailingIconType === 'cancel') {
			this.clearIconStatus();
			this.value = "";
			this.textFieldMDC.value = "";
		} else if (this.trailingIconType === 'keyboard_arrow_down') {
			/* Toggle the options menu visibility */
			this.menu.toggle();
		}
	}
	mouseoverEvent = () => {
		this.trailingIconType = this.options ? 'keyboard_arrow_down' : 'cancel';
	}
	mouseoutEvent = () => {
		this.trailingIconType = this.textFieldMDC.valid ? (this.options ? 'keyboard_arrow_down' : 'cancel') : 'error';
	}
	focusEvent = () => {
		this.menu.open();
	}
	blurEvent = (e) => {
		/*
			Controlamos que solo se cierre cuando se pierda el foco y
			no se haga click en el listado de opciones pues en ese caso
			no se llega a lanzar el evento click sobre el item del listado
		*/
		if (!e.relatedTarget || e.relatedTarget.tagName !== "CORREOS-UI-MENU") this.menu.close();
	}
	changeEvent = () => {
		this.value = this.textFieldMDC.value || "";
		this.trailingIconType = this.textFieldMDC.valid ? (this.options ? 'keyboard_arrow_down' : 'cancel') : "error";
		this.checkFilled();
	}
	keyupEvent = () => {
		this.clearIconStatus();
		this.changeEvent();
		this.menu.open();
	}

	checkFilled() {
		this.textInputFilled = this.textFieldMDC.valid && this.textFieldMDC.value !== '';
	}

	setSelectedValue(selectedValue: string) {
		this.value = selectedValue;
	}

	/**
	 * Method to clean the trailing icon before vanish him
	 */
	clearIconStatus() {
		if (this.textFieldIconMDCElement) {
			this.textFieldIconMDCElement.removeEventListener('click', this.clickEvent);
			this.textFieldIconMDCElement.removeEventListener('mouseover', this.mouseoverEvent);
			this.textFieldIconMDCElement.removeEventListener('mouseout', this.mouseoutEvent);
		}
	}
	/**
	 * Method to init the trailing icon
	 */
	initIconStatus() {
		if (this.textFieldIconMDCElement) {
			this.textFieldIconMDCElement.addEventListener('mouseover', this.mouseoverEvent);
			this.textFieldIconMDCElement.addEventListener('mouseout', this.mouseoutEvent);
			this.textFieldIconMDCElement.addEventListener('click', this.clickEvent);
		}
	}

	componentWillLoad() {
		this.hasIconSlot = !!this.hostElement.querySelector('[slot="icon"]');
	}

	componentDidLoad() {
		this.textFieldMDC = new MDCTextField(this.textFieldMDCElement);
		this.trailingIconType = this.textFieldMDC.valid ? (this.options ? 'keyboard_arrow_down' : 'cancel') : "error";
		this.textFieldMDC.listen('keyup', this.keyupEvent);
		//this.textFieldMDC.listen('change', this.keyupEvent);

		if (this.autofocus) {
			this.textFieldMDC.focus();
			this.menu.open();
		}

		/* Get all the events to be vinculated */
		Array.prototype.slice.call(this.hostElement.attributes).forEach(item => {
			this.validEventsList.includes(item.name) ? this.nativeEvents.push({ type: item.name.replace('on', ''), callback: item.value }) : null;
		})
		this.nativeEvents.forEach(eventToDeclare => {
			this.textFieldMDC.listen(eventToDeclare.type, (e) => {
				eval(eventToDeclare.callback)(e);
			});
		})

		this.checkFilled();

		// Events to vinculate the options menu
		if (this.menu) {
			this.textInputElement.addEventListener('focus', this.focusEvent);
			this.textInputElement.addEventListener('blur', this.blurEvent);
		}
	}

	componentDidUnload() {
		this.textFieldMDC.unlisten('keyup', this.keyupEvent);
		//this.textFieldMDC.unlisten('change', this.keyupEvent);
		this.nativeEvents.forEach(eventToDeclare => {
			this.textFieldMDC.unlisten(eventToDeclare.type, eval(eventToDeclare.callback)());
		})
		this.textInputElement.removeEventListener('focus', this.focusEvent);
		this.textInputElement.removeEventListener('blur', this.blurEvent);
	}

	componentDidRender() {
		if (this.iconTrailingElement) {
			this.initIconStatus();
		}
	}

	render() {
		// Right Back-rear icon
		this.iconTrailingElement = null;
		if (this.value) {
			this.iconTrailingElement = (
				<i
					class="material-icons mdc-text-field__icon"
					tabindex="0"
					role="button"
					ref={el => this.textFieldIconMDCElement = el as HTMLInputElement}
				>
					{this.trailingIconType}
				</i>
			);
		}

		const placeholderText = (this.textFieldMDCElement && this.textFieldMDCElement.querySelector('input').validationMessage) || this.placeholder;

		return (
			<div class="correos-ui-input_root">
				<slot name="icon" />
				<div
					class={`
						mdc-text-field
						mdc-text-field--with-trailing-icon
						mdc-menu-surface--anchor
						${this.textInputFilled ? 'mdc-text-field--filled' : ''}
						${this.hasIconSlot ? 'mdc-text-field--with-preppend-icon' : ''}

					`} ref={el => this.textFieldMDCElement = el as HTMLInputElement}
				>
					<input
						class="mdc-text-field__input"
						id={this.finalId}
						name={this.finalId}
						type={this.type}
						minlength={this.minlength}
						maxlength={this.maxlength}
						pattern={this.pattern}
						required={this.required}
						value={this.value}
						ref={el => this.textInputElement = el as HTMLInputElement}
					/>

					<label class={`mdc-floating-label ${this.value ? 'mdc-floating-label--float-above' : null}`} htmlFor="my-text-field">
						{this.label}
					</label>

					{this.iconTrailingElement}
					<div class="mdc-line-ripple"></div>

				</div>
				{placeholderText && (
					<div class="mdc-text-field-helper-line">
						<div
							id="mdc-text-field-helper-text"
							class={`
							mdc-text-field-helper-text
							${this.textFieldMDCElement && this.textFieldMDCElement.querySelector('input').validationMessage ? 'mdc-text-field-helper-text--validation-msg' : ''}
							${this.hasIconSlot ? 'mdc-text-field--with-preppend-icon' : ''}
							${this.placeholder ? 'mdc-text-field-helper-text--persistent' : ''}
						`}
							aria-hidden="true"
						>
							{placeholderText}
						</div>

						{this.maxlength && <div class="mdc-text-field-character-counter">{this.value.length} / {this.maxlength}</div>}
					</div>
				)}
				<correos-ui-menu
					ref={el => this.menu = el as HTMLCorreosUiMenuElement}
					value={this.value}
					options={this.options}
					elementClicked={newValue => { this.textFieldMDC.value = newValue; this.changeEvent(); }}
					parent={this.textFieldMDCElement}
				></correos-ui-menu>
			</div>
		);
	}
}
