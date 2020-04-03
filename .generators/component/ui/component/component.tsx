import { Component, Prop, h } from '@stencil/core';

@Component({
	tag: 'tag-template-component',
	styleUrl: 'style-template-component.scss',
	shadow: false,
	scoped: true
})
export class TemplateComponent {
  /**
   * The first name
   */
	@Prop() first: string = 'Jhon';

  /**
   * The last name
   */
	@Prop() last: string = 'Snow';

	private getText(): string {
		return `${this.first} ${this.last}`;
	}

	render() {
		return <div>Hello, World! I'm {this.getText()}</div>;
	}
}
