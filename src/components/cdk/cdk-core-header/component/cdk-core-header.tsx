import { Component, h, Host, Prop, State, Watch, Listen } from '@stencil/core';
import { CDKCoreHeaderNavigation } from '../models/cdk-core-header.model';
import { CDKCoreHeaderBrandLogo } from './fragments/cdk-core-header.logo';
import _isEmpty from 'lodash/isEmpty';
@Component({
	tag: 'correos-cdk-core-header',
	styleUrls: ['cdk-core-header.scss', 'cdk-core-header.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKCoreHeader {

	/** Ruta del asset del logo */
	@Prop({reflect: true}) logoSrc: string = 'images/cornamusa.svg';

	/** Valor del idioma actual */
	@Prop({reflect: true}) currentLang: string = 'es';

	/** Establece el menu como "fixed" */
	@Prop({reflect: true}) fixed: boolean;

	/** Objeto de literales
	 *  @type {[key:string]: string}
	 */
	@Prop({reflect: true}) literals: any = '';

	/** Objeto de literales
	 *  @type CDKCoreHeaderNavigation[]
	 */
	@Prop({reflect: true}) navigation: any = '';

	/** Establece el menu en su estado abierto */
	@Prop({reflect: true, mutable: true}) menuOpen: boolean = false;

	/** Establece el menu de primer nivel a mostrar en el usuario */
	@Prop({reflect: true, mutable: true}) menuLvZero: 'particular' | 'empresa' = 'particular';

	/** Establece como seleccionada la opción de primer nivel */
	@Prop({reflect: true, mutable: true}) menuLvFirst: string = '';

	@State() _navigation: CDKCoreHeaderNavigation[] = [];

	@State() _literals: {[key:string]: string} = {};
	
	$navMenu!: HTMLElement;
	$headerRoot!: HTMLElement;
	$switchParticular!: HTMLInputElement;
	$switchEmpresa!: HTMLInputElement;
	$secondLvTitle!: HTMLElement;
	$secondLvMenu!: HTMLElement;
	$menuButton!: HTMLButtonElement;

	@Watch('menuOpen') onMenuOpenChanges() {

		if (this.fixed) {
			document.body.classList.toggle('correos-cdk-core-header--lock-scroll', this.menuOpen)
		}

		if (this.menuOpen) {
			if (this.$navMenu) this.$navMenu.focus();
		} else {
			this.closeMenu();
		}

	}

	@Watch('menuLvZero') onMenuLvZeroChanges() {
		this.menuLvFirst = '';
	}

	@Watch('menuLvFirst') onMenuLvFirstChanges() {
		this.menuLvFirst 
			? this.$secondLvMenu.focus()
			: this.$navMenu.focus()
	}

	@Watch('navigation') parseNavigation(JSONString: string) {
		try { this._navigation = JSON.parse(JSONString); }
		catch(e) { 
			this._literals = {};
			console.error('Invalid JSON prop value', e)
		}
  }

	@Watch('literals') parseLiterals(JSONString: string) {
		try { this._literals = JSON.parse(JSONString); }
		catch(e) { 
			this._navigation = [];
			console.error('Invalid JSON prop value', e)
		}
  }

	@Listen('keydown', {target: 'document'})
	handleKeyDown(ev: KeyboardEvent){
		if (ev.key === 'Escape') { 
			this.menuLvFirst ? this.menuLvFirst = '' : this.closeMenu();
		}
	}
	componentWillLoad() {
		this.parseNavigation(this.navigation);
		this.parseLiterals(this.literals);
	}

	componentDidLoad() {
		this.onMenuOpenChanges();
		this.onMenuLvZeroChanges();
	}

	componentDidUnload() {
		this.onMenuOpenChanges();
	}

	handleSubmenuOpen(id: string) {
		this.menuLvFirst !== id 
			? this.menuLvFirst = id 
			: this.menuLvFirst = '';
	}

	getZeroLv(id: string): {[key: string]: any} {
		return this._navigation.find(item => item.id === id) || {};
	}

	getFirstLv() {
		return (this.getZeroLv(this.menuLvZero).children || [])
			.find(subitem => subitem.id === this.menuLvFirst) || {}
	}

	closeMenu() {
		this.menuOpen = false
		this.menuLvFirst = '';
		if (this.$menuButton) this.$menuButton.focus();
	}

	render() {
		
		const primaryItems = this.getZeroLv(this.menuLvZero).children;

		const cx = {
			isHeaderFixed: this.fixed ? '--fixed' : '--static',
			isMenuOpen: this.menuOpen ? '--show' : '--hide',
			isButtonExpand: this.menuOpen ? '--arrow-down' : '--arrow-up',
			isFirstLvActive: (id) => this.menuLvFirst === id ? '--active' : '',
			isSecondLvActive: this.menuLvFirst ? '--open' : '--hide',
			menuLvZero: `--${this.menuLvZero}`,
			isCurrentLang: (id) => this.currentLang === id ? '--title' : ''
		}

		return (
			<Host class={`${cx.isHeaderFixed} ${cx.menuLvZero}`}> 
				<div ref={el => this.$headerRoot = el as HTMLElement} class="cdk-core-header-root" >
						
					<header class="cdk-header">
						<div class="cdk-header-wrapper">
							<div class="cdk-header-start">
								<CDKCoreHeaderBrandLogo src={this.logoSrc} />
								<button class={`cdk-nav-button ${cx.isButtonExpand}`}
									onClick={() => this.menuOpen = !this.menuOpen}
									aria-label={this._literals.txtMenuButtonDesc || '[txtMenuButtonDesc]'}
									aria-expanded={this.menuOpen.toString()}
									aria-pressed={this.menuOpen.toString()}
									ref={el => this.$menuButton = el as HTMLButtonElement}
									onKeyDownCapture={(e) => e.key === 'Enter' ? this.menuOpen = !this.menuOpen : null}
								>
									<span>{this._literals.txtMenuButton || '[txtMenuButton]'}</span>
									<i class="icon-arrow"></i>
								</button>
							</div>
							<ol class="cdk-header-quick-access">
								{ (this.getZeroLv('accesos')?.children || []).map(item => 
									<li class={{
										'cdk-header-quick-access-item': true,
										// '--hide-on-desktop': item.id === 'busqueda',
										'--hide-label-on-desktop': item.id === 'tienda',
									}}>
										<a href={item.href} aria-label={item.name}>
											<i class={item.icon}></i>
											<span>{item.name}</span>
										</a>
									</li>
								)}
							</ol>
						</div>
					</header>
					
					<nav class={`cdk-nav ${cx.isMenuOpen}`}
						role="navigation"
						aria-expanded={this.menuOpen.toString()}
						aria-hidden={!this.menuOpen.toString()}
						tabindex={this.menuOpen ? '0' : '-1'}
						aria-label={this._literals.txtPrimaryNavDesc}
					 	ref={(el) => this.$navMenu = el as HTMLElement}
					>
						<div class="cdk-nav-content">
							<div class="cdk-nav-page --lv-first">
								<div class="cdk-nav-page-content --lv-first">

									{/* Empresa/Particular switch */}
									<div class="cdk-nav-switch">
										<div class="cdk-nav-switch-option">
											<input 
												ref={(el) => this.$switchParticular = el as HTMLInputElement}
												tabindex={this.menuOpen ? '0' : '-1'}
												type="radio" 
												id="core-header-switch-particular" 
												name="core-header-switch" 
												value=""
												onChange={() => this.menuLvZero = 'particular'}
												checked={this.menuLvZero === 'particular'}
											/>
											<label htmlFor="core-header-switch-particular">{this.getZeroLv('particular').name}</label>
										</div>
										<div class="cdk-nav-switch-option">
											<input 
												ref={(el) => this.$switchEmpresa = el as HTMLInputElement}	
												tabindex={this.menuOpen ? '0' : '-1'}
												type="radio" 
												id="core-header-switch-empresa" 
												name="core-header-switch"
												value=""
												onChange={() => this.menuLvZero = 'empresa'}
												checked={this.menuLvZero === 'empresa'}
											/>
											<label htmlFor="core-header-switch-empresa">{this.getZeroLv('empresa').name}</label>
										</div>
									</div>
									
									{/* Main menu */}
									<ol class="cdk-nav-lv-first" >

										{/* Conditional menu */}
										{this.menuOpen && primaryItems && primaryItems.map((item, index) =>
											<li class={`cdk-nav-lv-first-item --with-border ${cx.isFirstLvActive(item.id)} ${cx.menuLvZero + '-animation'}`}
												style={{'animation-duration': 200 * (index + 1) + 'ms'}}
											>
												{!_isEmpty(item.children)
												?
													<button 
														aria-expanded={(this.menuLvFirst === item.id).toString()}
														aria-pressed={(this.menuLvFirst === item.id).toString()}
														tabindex={this.menuOpen ? '0' : '-1'}
														// onMouseOver={() => this.menuLvFirst = item.id}
														onClick={this.handleSubmenuOpen.bind(this, item.id)}
													>
														<i class={`${item.icon} cdk-nav-lv-first-item-icon`} ></i>
														<h1 class="cdk-nav-lv-first-item-text">{item.name}</h1>
														<i class="icon-arrow cdk-nav-lv-first-item-arrow"></i>
													</button>
												: 
													<a href={item.href} tabindex={this.menuOpen ? '0' : '-1'}>
														<i class={`${item.icon} cdk-nav-lv-first-item-icon`} ></i>
														<h1 class="cdk-nav-lv-first-item-text">{item.name}</h1>
													</a>
												}
											</li>
										)}

										{/* Shared menu */}
										{this.menuOpen && this.getZeroLv('comunes').children && this.getZeroLv('comunes').children.map((item, index) =>
											<li 
												class={`cdk-nav-lv-first-item ${cx.isFirstLvActive(item.id)} ${cx.menuLvZero + '-animation'} ${index === 0 ? '--first-shared' : ''}`}
												style={{'animation-duration': (200 * (index + 1)) + ((primaryItems || []).length * 200) + 'ms'}}
											>
												{!_isEmpty(item.children)
												?
													<button 
														aria-expanded={(this.menuLvFirst === item.id).toString()}
														aria-pressed={(this.menuLvFirst === item.id).toString()}
														tabindex={this.menuOpen ? '0' : '-1'}
														// onMouseOver={() => this.menuLvFirst = item.id}
														onClick={this.handleSubmenuOpen.bind(this, item.id)}
													>
														<i class={`${item.icon} cdk-nav-lv-first-item-icon`} ></i>
														<h1 class="cdk-nav-lv-first-item-text">{item.name}</h1>
														<i class="icon-arrow cdk-nav-lv-first-item-arrow"></i>
													</button>
												: 
													<a href={item.href} tabindex={this.menuOpen ? '0' : '-1'}>
														<i class={`${item.icon} cdk-nav-lv-first-item-icon`} ></i>
														<h1 class="cdk-nav-lv-first-item-text">{item.name}</h1>
													</a>
												}
											</li>
										)}
									</ol>
								
									
									{/* Languages */}
									<div class="cdk-nav-langs">										
										<span class="cdk-nav-langs-title">{this.getZeroLv('idiomas').name}</span>
										<ol class="cdk-nav-langs-list"
											tabindex={this.menuOpen ? '0' : '-1'}
											aria-label={this._literals.txtLangDesc}
										>
											{(this.getZeroLv('idiomas')?.children || []).map(lang => 
												<li class={`cdk-nav-langs-item ${cx.isCurrentLang(lang.id)}`}>
													<a tabindex={this.menuOpen ? '0' : '-1'} href={lang.href}>{lang.name}</a>
												</li>
											)}
										</ol>
									</div>

								</div>
							</div>
							<div class="cdk-nav-page --lv-second">
								<div class={`cdk-nav-page-content --lv-second ${cx.isSecondLvActive}`}
									aria-hidden={!Boolean(this.menuLvFirst).toString()}
									tabindex={this.menuLvFirst ? '0' : '-1'}
									arial-label={this._literals.txtSecondaryNavDesc}
									// onMouseLeave={() => this.menuLvFirst = ''}
									ref={el => this.$secondLvMenu = el as HTMLElement}
								>
									<header class="cdk-nav-lv-second-toolbar">
										<button
											arial-label={this._literals?.txtGoBackDesc || '[txtGoBackDesc]'}
											class="cdk-nav-lv-second-goback"
											onClick={() => this.menuLvFirst = ''}
										>
											<i class="icon-arrow"></i>
											<span>{this._literals?.txtGoBack || '[txtGoBack]'}</span>
										</button>
									</header>
									<h2 class="cdk-nav-lv-second-title"
										tabindex={this.menuOpen ? '0' : '-1'}
										ref={el => this.$secondLvTitle = el as HTMLElement}
									>{this.getFirstLv().name || '[no-section]'}</h2>
									<ol class="cdk-nav-lv-second-columns"

									>
										{this.menuLvFirst && this.getFirstLv()?.children?.map(itemSecond => 
											<li class="cdk-nav-lv-second-column">
												{itemSecond.href 
													? <a 
															class="cdk-nav-lv-third --title" 
															href={itemSecond.href}
															tabindex={this.menuOpen ? '0' : '-1'}
														>{itemSecond.name}</a>
													: <h3 class="cdk-nav-lv-third --title">{itemSecond.name}</h3>
												}
												{!_isEmpty(itemSecond.children) && 
													<ol>
														{itemSecond.children.map(itemThird => 
															<li class="cdk-nav-lv-third">
																<a tabindex={this.menuOpen ? '0' : '-1'} href={itemThird.href}>{itemThird.name}</a>
															</li>
														)}
													</ol>
												}
											</li>
										)}
									</ol>
								</div>
								<div class="cdk-nav-page-click-outside"  onClick={this.closeMenu.bind(this)}>
									{/* Empty div for catch click outside Event */}
								</div>
							</div>
							<div class="cdk-nav-content-click-outside" onClick={this.closeMenu.bind(this)}>
								{/* Empty div for catch click outside Event */}
							</div>
						</div>
						<div class="cdk-nav-overlay"
							onClick={() => this.menuOpen = !this.menuOpen}
						>{/* Overlay */}</div>
					</nav>
				</div>
			</Host>
		);
	}

}
