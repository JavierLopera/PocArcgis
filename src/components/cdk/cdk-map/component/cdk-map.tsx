import { Component, Host, h, Prop } from '@stencil/core';
// import { MatchResults, RouterHistory } from "@stencil/router";
import { loadCss, loadModules } from "esri-loader";

@Component({
	tag: 'correos-cdk-map',
	styleUrls: ['cdk-map.scss', 'cdk-map.theme.scss'],
	shadow: false,
	scoped: true
})
export class CDKMap {

	rippleLinkElement: HTMLDivElement;

	/**
	 * topo, streets, satellite, hybrid, dark-gray, gray, national-geographic, oceans, osm, terrain, dark-gray-vector, gray-vector
	 * streets-vector, streets-night-vector, streets-navigation-vector, topo-vector, streets-relief-vector
	 */
	@Prop() viewTypeMap = 'streets-navigation-vector';

	/* Zoom por defecto de la vista del mapa */
	@Prop() viewZoomMap: number = 8;

	/* Posicion en el globo terraqueo inicial ejemplo: [-4, 40] */
	@Prop() viewPositionMap: number[] = [-4, 40];

	/**
   	* esri-loader options
   	*/
	esriMapOptions = {
		url: `https://js.arcgis.com/4.7/`
	};

	esriMap: __esri.Map; // Instancia del mapa
	esriMapView: __esri.MapView; // Instancia de la vista del mapa

	constructor() {
		loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

		loadModules(
			[
				"esri/Map",
				"esri/views/MapView"
			],
			this.esriMapOptions
		).then(
			([Map, MapView]: [
				__esri.MapConstructor,
				__esri.MapViewConstructor
			]) => {
				const mapDiv = this.rippleLinkElement;

				this.esriMap = new Map({
					basemap: this.viewTypeMap
				});

				this.esriMapView = new MapView({
					container: mapDiv,
					zoom: this.viewZoomMap,
					center: this.viewPositionMap,
					map: this.esriMap
				});
			}
		);
	}

	render() {

		return (
			<Host>
				<div class="app-map" ref={el => this.rippleLinkElement = el as HTMLDivElement} />
			</Host>
		);
	}
}
