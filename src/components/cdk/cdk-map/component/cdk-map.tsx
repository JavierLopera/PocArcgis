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
	@Prop() viewZoomMap: number = 2;

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
				"esri/views/MapView",
				"esri/layers/FeatureLayer"
			],
			this.esriMapOptions
		).then(
			([Map, MapView, FeatureLayer]: [
				__esri.MapConstructor,
				__esri.MapViewConstructor,
				any
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

				// Trailheads feature layer (points)
				const trailheadsLayer = new FeatureLayer({
					url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
				});

				// trailheadsLayer.setFeatureReduction({
				// 	type: "cluster",
				// 	clusterRadius: 60
				// });

				this.esriMap.add(trailheadsLayer);

				// symbol
				// const trailheadsRenderer = {
				// 	type: "simple",
				// 	symbol: {
				// 		type: "picture-marker",
				// 		url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
				// 		width: "18px",
				// 		height: "18px"
				// 	}
				// }

				// const trailheadsLabels = {
				// 	symbol: {
				// 		type: "text",
				// 		color: "#FFFFFF",
				// 		haloColor: "#5E8D74",
				// 		haloSize: "2px",
				// 		font: {
				// 			size: "12px",
				// 			family: "Noto Sans",
				// 			style: "italic",
				// 			weight: "normal"
				// 		}
				// 	},
				// 	labelPlacement: "above-center",
				// 	labelExpressionInfo: {
				// 		expression: "$feature.TRL_NAME"
				// 	}
				// };

				// const trailheads = new FeatureLayer({
				// 	url:
				// 		"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
				// 	renderer: trailheadsRenderer,
				// 	labelingInfo: [trailheadsLabels],
				// 	popupTemplate: {
				// 		title: "Hola Mundo",
				// 		content: "Esto es una prueba de texto de un popup"
				// 	}
				// });

				// trailheads.setFeatureReduction({
				// 	type: "cluster",
				// 	clusterRadius: 60
				//   });

				// this.esriMap.add(trailheads);

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
