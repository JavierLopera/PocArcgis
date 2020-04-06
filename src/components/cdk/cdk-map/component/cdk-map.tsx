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
	graphicsLayer;
	sketch;

	constructor() {
		loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

		loadModules(
			[
				"esri/Map",
				"esri/layers/FeatureLayer",
				"esri/layers/GraphicsLayer"
			],
			this.esriMapOptions
		).then(
			([EsriMap, FeatureLayer, GraphicsLayer]: [
				__esri.MapConstructor,
				__esri.FeatureLayerConstructor,
				__esri.GraphicsLayerConstructor
			]) => {
				this.graphicsLayer = new GraphicsLayer();

				this.esriMap = new EsriMap({
					basemap: this.viewTypeMap,
					layers: [this.graphicsLayer]
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
			"esri/widgets/BasemapGallery",
			"esri/widgets/Sketch"
		], this.esriMapOptions).then(
			([EsriMapView, BasemapToggle, BasemapGallery, Sketch]:
				[
					__esri.MapViewConstructor,
					__esri.BasemapToggleConstructor,
					__esri.BasemapGalleryConstructor,
					__esri.SketchConstructor
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

				this.sketch = new Sketch({
					view: this.esriMapView,
					layer: this.graphicsLayer
				});

				const stroke = {
					color: [255, 0, 0],
					width: 1
				}

				//*** White fill color with 50% transparency ***//
				const fillColor = [255, 255, 255, .5];

				//*** Override all of the default symbol colors and sizes ***//
				const pointSymbol = this.sketch.viewModel.pointSymbol;
				pointSymbol.color = fillColor;
				pointSymbol.outline = stroke;
				pointSymbol.size = 8;

				const polylineSymbol = this.sketch.viewModel.polylineSymbol;
				polylineSymbol.color = stroke.color;
				polylineSymbol.width = stroke.width;

				const polygonSymbol = this.sketch.viewModel.polygonSymbol;
				polygonSymbol.color = fillColor;
				polygonSymbol.outline = stroke;

				this.esriMapView.ui.add(this.basemapToggle, "bottom-right");
				this.esriMapView.ui.add(this.basemapGallery, "top-right");
				this.esriMapView.ui.add(this.sketch, "bottom-left");
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
