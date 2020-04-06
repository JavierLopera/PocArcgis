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

	constructor() {
		loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

		loadModules(
			["esri/Map", "esri/layers/FeatureLayer"],
			this.esriMapOptions
		).then(
			([EsriMap, FeatureLayer]: [
				__esri.MapConstructor,
				__esri.FeatureLayerConstructor
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
		return loadModules(["esri/views/MapView"], this.esriMapOptions).then(
			([EsriMapView]: [__esri.MapViewConstructor]) => {
				const mapDiv = this.rippleLinkElement;

				this.esriMapView = new EsriMapView({
					container: mapDiv,
					zoom: this.viewZoomMap,
					center: this.viewPositionMap,
					map: this.esriMap
				});
			}
		);
	}

	// Metodo encargado de ir a una ubicación concreta
	// zoomToUrlObjectId(duration = 1600) {
	// 	debugger
	// 	if (this.match && this.match.params && this.match.params.objectid) {
	// 		debugger
	// 		this.municipalitiesFeatureLayer
	// 			.queryFeatures({
	// 				where: "objectid = " + this.match.params.objectid,
	// 				num: 1,
	// 				returnGeometry: true
	// 			})
	// 			.then(results => {
	// 				if (results.features.length) {
	// 					const firstResult = results.features[0];
	// 					this.zoomToAndHighlighFeature(firstResult, duration);
	// 				}
	// 			});
	// 	}
	// }

	// zoomToAndHighlighFeature(feature: __esri.Graphic, duration = 1600) {
	// 	debugger
	// 	this.esriMapView.when(() => {
	// 		const symbol = {
	// 			type: "simple-fill",
	// 			color: [51, 51, 204, 0.9],
	// 			style: "solid",
	// 			outline: {
	// 				color: "white",
	// 				width: 1
	// 			}
	// 		};

	// 		const highlightPolygon = feature.clone();
	// 		highlightPolygon.set("symbol", symbol);

	// 		this.esriMapView.graphics.removeAll();
	// 		this.esriMapView.graphics.add(highlightPolygon);

	// 		this.esriMapView.goTo(feature.geometry, {
	// 			duration: duration,
	// 			easing: "ease-in"
	// 		});
	// 	});
	// }

	// Metodo encargado de que cuando haces click te redirija a el lugar correspondiente, No funciona
	// addZoomOnClickAndUrlUpdate() {
	// 	debugger
	// 	this.esriMapView.on("click", evt => {
	// 		this.esriMapView
	// 			.whenLayerView(this.municipalitiesFeatureLayer)
	// 			.then((lyrView: __esri.FeatureLayerView) => {
	// 				lyrView.queryFeatures().then(results => {
	// 					results.features.some(f => {
	// 						const polygon = f.geometry as __esri.Polygon;
	// 						if (polygon.contains(evt.mapPoint)) {
	// 							this.history.push(`/map/${f.attributes.ObjectId}`, {});
	// 							this.zoomToAndHighlighFeature(f, 500);
	// 							return true;
	// 						}
	// 						return false;
	// 					});
	// 				});
	// 			});
	// 	});
	// }

	render() {


		return (
			<Host>
				<div class="app-map" ref={el => this.rippleLinkElement = el as HTMLDivElement} />
			</Host>
		);
	}
}


// connectedCallback() {
// 	// lazy load the required ArcGIS API for JavaScript modules and CSS
// 	loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
// 		.then(([ArcGISMap, MapView]) => {
// 			const map = new ArcGISMap({
// 				basemap: 'topo-vector'
// 			});

// 			this.view = new MapView('webmap', {
// 				container: this.rippleLinkElement.current,
// 				map: map,
// 				center: [-118, 34],
// 				zoom: 8
// 			});
// 		});
// }

// disconnectedCallback() {
// 	if (this.view) {
// 		// destroy the map view
// 		this.view.container = null;
// 	}
// }


// /** Ciclo de vida ejecutado tras el primer Render después de la carga */
// componentDidLoad() { }

// /** Ciclo de vida ejecutado tras actualizarse */
// componentDidUpdate() { }

// /** Ciclo de vida al eliminar la instancia del componente */
// componentDidUnload() { }

{/* <div id="webmap" class="webmap" ref={el => this.rippleLinkElement = el as HTMLDivElement} /> */ }
