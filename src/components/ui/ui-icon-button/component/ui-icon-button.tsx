import { Component, Prop, h } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
	tag: 'correos-ui-icon-button',
	styleUrls: ['ui-icon-button.theme.scss', 'ui-icon-button.scss'],
	shadow: false,
	scoped: true
})
export class UiIconButton {
  /**
	 * Value aria-label attribute of the button
	 */
	@Prop() ariaLabel: string;

	/**
	   * Value (optional) which allows to enable or disable the button
	   */
	@Prop() disabled: boolean;

	rippleButtonElement!: HTMLButtonElement;

	componentDidLoad() {
		new MDCRipple(this.rippleButtonElement);
	}

	render() {
		return (
			<button class="mdc-fab mdc-fab--mini" type="button" aria-label={this.ariaLabel} disabled={this.disabled}
				ref={el => this.rippleButtonElement = el as HTMLButtonElement}>
				<div class="mdc-fab__ripple"></div>
				<slot name="icon" />
			</button>
		);
	}

}
