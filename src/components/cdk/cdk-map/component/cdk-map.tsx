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
	// view;
	@Prop() match;
	@Prop() history;

	/**
	 * topo, streets, satellite, hybrid, dark-gray, gray, national-geographic, oceans, osm, terrain, dark-gray-vector, gray-vector
	 * streets-vector, streets-night-vector, streets-navigation-vector, topo-vector, streets-relief-vector
	 */
	@Prop() viewTypeMap = 'streets';

	/* Zoom por defecto de la vista del mapa */
	@Prop() viewZoomMap: number = 6;

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
	municipalitiesFeatureLayer: __esri.FeatureLayer; // Caracteristicas del mapa
	basemapToggle; // Permite alterna entre el modod satelite y Topografico
	basemapGallery; // Permite cambiar mapas base de un grupo de Arcgis Online

	constructor() {
		loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

		loadModules(
			[
				"esri/Map",
				"esri/layers/FeatureLayer"
			],
			this.esriMapOptions
		).then(
			([EsriMap, FeatureLayer]: [
				__esri.MapConstructor,
				__esri.FeatureLayerConstructor,
			]) => {
				this.esriMap = new EsriMap({
					basemap: this.viewTypeMap
				});

				this.municipalitiesFeatureLayer = new FeatureLayer({
					url: 'https://services.arcgis.com/Li1xnxaTwJ2lGrgz/arcgis/rest/services/Kommuner/FeatureServer/0'
				});

				this.esriMap.add(this.municipalitiesFeatureLayer);
			}
		);
	}

	componentDidUpdate() {
		console.log("component update");
		// this.zoomToUrlObjectId(600);
	}

	componentDidLoad() {
		this.createEsriMapView()
		// .then(() => this.zoomToUrlObjectId())
		// .then(() => this.addZoomOnClickAndUrlUpdate());
	}

	/**
	* Inicializa la vista del mapa
	*/
	createEsriMapView() {
		return loadModules([
			"esri/views/MapView",
			"esri/widgets/BasemapToggle",
			"esri/widgets/BasemapGallery"], this.esriMapOptions).then(
				([EsriMapView, BasemapToggle, BasemapGallery]:
					[
						__esri.MapViewConstructor,
						__esri.BasemapToggleConstructor,
						__esri.BasemapGalleryConstructor
					]) => {

					const mapDiv = this.rippleLinkElement;

					this.esriMapView = new EsriMapView({
						container: mapDiv,
						zoom: this.viewZoomMap,
						center: this.viewPositionMap,
						map: this.esriMap
					});

					this.basemapToggle = new BasemapToggle({
						view: this.esriMapView,
						nextBasemap: "satellite"
					});

					this.basemapGallery = new BasemapGallery({
						view: this.esriMapView,
						source: {
							portal: {
								url: "https://www.arcgis.com",
								useVectorBasemaps: false  // Load vector tile basemaps
							}
						}
					});

					this.esriMapView.ui.add(this.basemapToggle, "bottom-right");
					this.esriMapView.ui.add(this.basemapGallery, "top-right");
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


// // puntos
// const trailheadsLayer = new FeatureLayer({
// 	url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
// });

// // Lineas
// const trailsLayer = new FeatureLayer({
// 	url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
// });

// // poligonos
// const parksLayer = new FeatureLayer({
// 	url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
// });

// this.esriMap.add(this.municipalitiesFeatureLayer);
// this.esriMap.add(trailheadsLayer);
// this.esriMap.add(trailsLayer, 0);
// this.esriMap.add(parksLayer, 0);