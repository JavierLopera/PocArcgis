//import { MDCMenu } from '@material/menu';
import { MDCMenuSurface } from '@material/menu-surface';
import { MDCList } from '@material/list';
import { Component, Method, h, Prop } from '@stencil/core';

@Component({
	tag: 'correos-ui-menu',
	styleUrl: 'ui-menu.scss',
	shadow: false,
    scoped: true
})

export class UiMenu {
	/*	
		CONSIDERACIONES:
		- Se debe tener en cuenta que los eventos vinculados al listado pierden su enlace
		  cada vez que éste se renderiza por lo que en cada renderizado se deben setear 
		  para que de esta forma sus opciones mantengan su focusabilidad, en caso contrario
		  al perder el foco el Input se cerrará el menú y no se cambiará el valor del mismo
	*/
	/**
	 * Valor del campo input
	 */
	@Prop() value: string;
	/**
	 * Set de opciones a mostrar en el menú
	 */
	@Prop() options: string;
	/**
	 * Flag para abrir inicialmente el menú
	 */
	@Prop() opened: boolean;
	/**
	 * Funtión a lanzar cuando se hace click sobre un elemento pasando el valor
	 */
	@Prop() elementClicked: Function;
	/**
	 * Elemento HTML padre sobre el cual asignar el origen del menú
	 */
	@Prop() parent: HTMLInputElement;
	/**
	 * Metodo para mostrar el menú
	 */
	@Method()
	async open() {
		if (this.menuOptionsMDC && !this.menuOptionsMDC.isOpen()) this.menuOptionsMDC.open();
	}
	/**
	 * Metodo para ocultar el menú
	 */
	@Method()
	async close() {
		if (this.menuOptionsMDC && this.menuOptionsMDC.isOpen()) this.menuOptionsMDC.close();
	}
	/**
	 * Metodo para cambiar el estado de la visiblidad del menú
	 */
	@Method()
	async toggle() {
		this.menuOptionsMDC.isOpen() ? this.close() : this.open();
	}
	/**
	 * Metodo parasaber estado actual del menú
	 */
	@Method()
	async isOpened() {
		return this.menuOptionsMDC ? this.menuOptionsMDC.isOpen() : false;
	}

	menuOptionsMDC: MDCMenuSurface;
	menuOptionsMDCElement: HTMLInputElement;
	listOptionsMDC: MDCList;
	listOptionsMDCElement: HTMLUListElement;
	optionsFiltered: Array<String>;

	actionEventListener = (ev: CustomEvent) => {
		const selectedIndex = ev.detail.index;
		this.elementClicked(ev, this.optionsFiltered[selectedIndex])
	};

	openedEventListener = () => {
		if (this.parent) {
			const styles = {};
			styles['left'] = this.parent.getBoundingClientRect().left;
			styles['width'] = this.parent.getBoundingClientRect().right - this.parent.getBoundingClientRect().left;
			styles['top'] = this.parent.getBoundingClientRect().bottom;
			this.menuOptionsMDCElement.setAttribute('style', `left:${styles['left']}px;width:${styles['width']}px;top:${styles['top']}px`);
		}
	}

	componentDidUnload() {
		if (this.menuOptionsMDC) {
			this.menuOptionsMDC.unlisten('MDCMenuSurface:opened', this.openedEventListener);
			this.menuOptionsMDC.destroy()
		}
		if (this.listOptionsMDC) {
			this.listOptionsMDC.unlisten('MDCList:action', this.actionEventListener);
			this.listOptionsMDC.destroy();
		}
	}

	componentDidLoaded() {
		// Autofocus del input que se propaga
		if (this.opened) this.open();
	}

	componentDidRender() {
		/*
			Una vez se haya renderizado la plantilla y exista listado por que haya opciones
			verificamos si anteriormente de renderizados anteriores ya existia el componente
			para inicializarlo en su defecto y acto seguido escuchamos el posible evento
			'MDCList:action' que se ejecutará siempre que se seleccione un item
		*/
		if (this.menuOptionsMDCElement) {
			if (!this.menuOptionsMDC) {
				this.menuOptionsMDC = new MDCMenuSurface(this.menuOptionsMDCElement);
				this.menuOptionsMDC.listen('MDCMenuSurface:opened', this.openedEventListener);
			}
		}
		if (this.listOptionsMDCElement) {
			if (this.listOptionsMDC) {
				this.listOptionsMDC.unlisten('MDCList:action', this.actionEventListener);
				this.listOptionsMDC.destroy();
			}
			this.listOptionsMDC = new MDCList(this.listOptionsMDCElement);
			this.listOptionsMDC.listen('MDCList:action', this.actionEventListener);
		}
	}

	render() {
		// Filtramos las opciones iniciales referente al valor del input actual
		this.optionsFiltered = [];
		if (this.options) {
			const optionsArray = this.options.split(',');
			optionsArray.forEach(option => {
				option.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()) && option !== this.value
					? this.optionsFiltered.push(option)
					: null;
			});
		}
		// Generamos el posible listado partiendo de las opciones filtradas disponibles 
		let list = null;
		if (this.optionsFiltered.length > 0) {
			list = (
				<ul class="mdc-list" role="listbox" aria-hidden="true" aria-orientation="vertical" ref={el => this.listOptionsMDCElement = el as HTMLUListElement}>
					{this.optionsFiltered.map(option => {
						return (
							<li class="mdc-list-item" role="option" tabindex="0">
								<span class="mdc-list-item__text">
									{option}
								</span>
							</li>
						)
					})}
				</ul>
			)
		} else if (this.listOptionsMDC) {
			/*
				Estamos preparando una renderización nueva por lo que forzamos a resetear el componente del listado
				ya que se inicializará posteriormente cuando el renderizado finalice 
			*/
			this.listOptionsMDC.unlisten('MDCList:action', this.actionEventListener);
			this.listOptionsMDC.destroy();
		}

		this.menuOptionsMDCElement = (
			<div class={`mdc-menu mdc-menu-surface ${this.opened && 'mdc-menu-surface--open'}`} ref={el => this.menuOptionsMDCElement = el as HTMLInputElement}>
				{list}
			</div >
		);

		return this.menuOptionsMDCElement;
	}
}