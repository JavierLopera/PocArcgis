import { Component, Host, h } from '@stencil/core';
import { loadModules } from 'esri-loader';

@Component({
	tag: 'correos-cdk-map',
	styleUrls: ['cdk-map.scss', 'cdk-map.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKMap {

	rippleLinkElement;
	view;

	connectedCallback() {
		// lazy load the required ArcGIS API for JavaScript modules and CSS
		loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
			.then(([ArcGISMap, MapView]) => {
				const map = new ArcGISMap({
					basemap: 'topo-vector'
				});

				this.view = new MapView('webmap', {
					container: this.rippleLinkElement.current,
					map: map,
					center: [-118, 34],
					zoom: 8
				});
			});
	}

	disconnectedCallback() {
		if (this.view) {
			// destroy the map view
			this.view.container = null;
		}
	}


	/** Ciclo de vida ejecutado tras el primer Render después de la carga */
	componentDidLoad() { }

	/** Ciclo de vida ejecutado tras actualizarse */
	componentDidUpdate() { }

	/** Ciclo de vida al eliminar la instancia del componente */
	componentDidUnload() { }

	render() {


		return (
			<Host>
				<div id="webmap" class="webmap" ref={el => this.rippleLinkElement = el as HTMLDivElement} />
			</Host>
		);
	}
}
