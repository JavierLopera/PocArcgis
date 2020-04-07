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
	rippleLinkElement2: HTMLDivElement;
	rippleButtonElement: HTMLButtonElement;

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
				"esri/layers/FeatureLayer",
				"esri/layers/GeoJSONLayer",
				"esri/widgets/Legend",
				"esri/widgets/Expand",
				"esri/widgets/Home"
			],
			this.esriMapOptions
		).then(
			([
				Map,
				MapView,
				FeatureLayer,
				GeoJSONLayer,
				// Legend,
				Expand,
				Home
			]: [
					__esri.MapConstructor,
					__esri.MapViewConstructor,
					any,
					any,
					// __esri.LegendConstructor,
					__esri.ExpandConstructor,
					__esri.HomeConstructor
				]) => {
				const mapDiv = this.rippleLinkElement;

				/* Configura el agrupamiento en la capa. Un radio de clúster de 100 px indica un área que comprende 
				* un espacio de pantalla de 100 px de longitud desde el centro del clúster.
				*/
				const clusterConfig = {
					type: "cluster",
					clusterRadius: "100px",
					// {cluster_count} es un campo agregado que contiene la cantidad de características que comprende el clúster
					popupTemplate: {
						content: "This cluster represents {cluster_count} earthquakes."
					}
				};

				const layer = new GeoJSONLayer({
					title: "Terremotos en el último mes",
					url:
						"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
					copyright: "USGS Earthquakes",
					featureReduction: clusterConfig,
					popupTemplate: {
						title: "Earthquake Info",
						content: "Magnitude {mag} {type} hit {place} on {time}",
						fieldInfos: [
							{
								fieldName: "time",
								format: {
									dateFormat: "short-date-short-time"
								}
							}
						]
					},
					renderer: {
						type: "simple",
						field: "mag",
						symbol: {
							type: "simple-marker",
							size: 4,
							color: "#fc3232",
							outline: {
								color: [50, 50, 50]
							}
						}
					}
				});

				const baseLayer = new FeatureLayer({
					portalItem: {
						id: "2b93b06dc0dc4e809d3c8db5cb96ba69"
					},
					legendEnabled: false,
					popupEnabled: false,
					renderer: {
						type: "simple",
						symbol: {
							type: "simple-fill",
							color: [50, 50, 50, 0.75],
							outline: {
								color: "white",
								width: 0.5
							}
						}
					},
					spatialReference: {
						wkid: 5936
					}
				});

				this.esriMap = new Map({
					basemap: this.viewTypeMap,
					layers: [baseLayer, layer]
				});


				// this.esriMapView = new MapView({
				// 	container: mapDiv,
				// 	zoom: this.viewZoomMap,
				// 	center: this.viewPositionMap,
				// 	map: this.esriMap
				// });

				this.esriMapView = new MapView({
					// container: "viewDiv",
					container: mapDiv,
					zoom: this.viewZoomMap,
					extent: {
						xmin: 396381,
						ymin: -2099670,
						xmax: 3393803,
						ymax: 148395,
						spatialReference: {
							wkid: 5936
						}
					},
					spatialReference: {
						// WGS_1984_EPSG_Alaska_Polar_Stereographic
						wkid: 5936
					},
					constraints: {
						minScale: 15469455
					},
					map: this.esriMap
				});

				this.esriMapView.ui.add(
					new Home({
						view: this.esriMapView
					}),
					"top-left"
				);

				// const legend = new Legend({
				// 	view: this.esriMapView,
				// 	container: mapDiv
				// });

				const infoDiv = this.rippleLinkElement2;

				this.esriMapView.ui.add(
					new Expand({
						view: this.esriMapView,
						content: infoDiv,
						expandIconClass: "esri-icon-layer-list",
						expanded: true
					}),
					"top-left"
				);

				const toggleButton = this.rippleButtonElement;

				// Para desactivar la agrupación de contenido en la capa,
				// establezca la propiedad featureReduction  en null
				toggleButton.addEventListener("click", function () {
					let fr = layer.featureReduction;
					layer.featureReduction =
						fr && fr.type === "cluster" ? null : clusterConfig;
					toggleButton.innerText =
						toggleButton.innerText === "Enable Clustering"
							? "Disable Clustering"
							: "Enable Clustering";
				});

			}
		);
	}

	render() {

		return (
			<Host>
				<div class="app-map" ref={el => this.rippleLinkElement = el as HTMLDivElement} >
					<div id="infoDiv" class="esri-widget" ref={el => this.rippleLinkElement2 = el as HTMLDivElement}>
						<button id="cluster" class="esri-button" ref={el => this.rippleButtonElement = el as HTMLButtonElement}>
							Disable Clustering
						</button>
						<div id="legendDiv"></div>
					</div>
				</div>
			</Host>
		);
	}
}
