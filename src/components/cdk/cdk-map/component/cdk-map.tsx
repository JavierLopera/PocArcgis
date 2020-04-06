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
	graphicsLayer;

	point = {
		type: "point",
		longitude: -3.691,
		latitude: 40.415
	};

	symbol = {
		type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
		url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
		width: "40px",
		height: "40px"
	};

	attributes = {
		Name: "Mi ejemplo",  // The name of the
		Location: " Ejemplo correos",  // The owner of the
	};

	// Create popup template
	popupTemplate = {
		title: this.attributes.Name,
		content: `I am located at <b>${this.attributes.Location}</b>.`
	};

	simpleMarkerSymbol = {
		type: "simple-marker",
		color: [226, 119, 40],  // orange
		outline: {
			color: [255, 255, 255], // white
			width: 1
		}
	};

	// Vertices poligono
	polygon = {
		type: "polygon",
		rings: [
			[-3.669, 40.269],
			[-3.664, 40.201],
			[-3.568, 40.239],
			[-3.583, 40.332],
		]
	};

	// Estilo poligono
	simpleFillSymbol = {
		type: "simple-fill",
		color: [227, 139, 79, 0.8],  // orange, opacity 80%
		outline: {
			color: [255, 255, 255],
			width: 1
		}
	};

	constructor() {
		loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

		loadModules(
			[
				"esri/Map",
				"esri/views/MapView",
				"esri/Graphic",
				"esri/layers/GraphicsLayer"
			],
			this.esriMapOptions
		).then(
			([Map, MapView, Graphic, GraphicsLayer]: [
				__esri.MapConstructor,
				__esri.MapViewConstructor,
				any,
				__esri.GraphicsLayerConstructor
			]) => {
				const mapDiv = this.rippleLinkElement;
				this.graphicsLayer = new GraphicsLayer();

				this.esriMap = new Map({
					basemap: this.viewTypeMap
				});

				this.esriMapView = new MapView({
					container: mapDiv,
					zoom: this.viewZoomMap,
					center: this.viewPositionMap,
					map: this.esriMap
				});

				// const pointGraphic = new Graphic({
				// 	geometry: this.point,
				// 	symbol: this.symbol
				// });

				// Localizador
				const coordsWidget = document.createElement("div");
				coordsWidget.id = "coordsWidget";
				coordsWidget.className = "esri-widget esri-component";
				coordsWidget.style.padding = "7px 15px 5px";

				const showCoordinates = (pt) => {
					var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
						" | Scale 1:" + Math.round(this.esriMapView.scale * 1) / 1 +
						" | Zoom " + this.esriMapView.zoom;
					coordsWidget.innerHTML = coords;
				}

				this.esriMapView.watch("stationary", () => {
					showCoordinates(this.esriMapView.center);
				});

				this.esriMapView.on("pointer-move", (evt) => {
					showCoordinates(this.esriMapView.toMap({ x: evt.x, y: evt.y }));
				});

				//Poligonos
				const polygonGraphic = new Graphic({
					geometry: this.polygon,
					symbol: this.simpleFillSymbol
				});

				// Pop up
				const pointGraphic = new Graphic({
					geometry: this.point,
					symbol: this.symbol,
					//*** ADD ***//
					attributes: this.attributes,
					popupTemplate: this.popupTemplate
				});


				// Add

				this.graphicsLayer.add(pointGraphic);
				this.graphicsLayer.add(polygonGraphic);
				this.graphicsLayer.add(pointGraphic);

				this.esriMap.add(this.graphicsLayer);

				// Localizador
				this.esriMapView.ui.add(coordsWidget, "bottom-right");

				const pictureGraphic = new Graphic({
					geometry: {
						type: "point",
						longitude: -3.491,
						latitude: 40.480
					},
					symbol: {
						type: "picture-marker",
						url: "https://developers.arcgis.com/labs/images/bluepin.png",
						width: "14px",
						height: "26px"
					}
				});

				const textGraphic = new Graphic({
					geometry: {
					  type: "point",
					  longitude: -3.291,
					  latitude: 40.480
					},
					symbol: {
					   type: "text",
					   color: [25,25,25],
					   haloColor: [255,255,255],
					   haloSize: "1px",
					   text: "This is my location!",
					   xoffset: 0,
					   yoffset: -25,
					   font: {
						 size: 12
					  }
					}
				  });
			 
				  this.graphicsLayer.add(textGraphic);

				this.graphicsLayer.add(pictureGraphic);
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
