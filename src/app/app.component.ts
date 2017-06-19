import {AfterContentInit, Component} from "@angular/core";
import {MapService} from "../services/map.service";
import {GeocodingService} from "../services/geocoding.service";
import {ParentService} from "../services/parent.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent  implements AfterContentInit {
  loggedUser: any = false;

  constructor(private mapService: MapService, private geocoder: GeocodingService, private parentService: ParentService) {
  }

  ngAfterContentInit() {
    const map = L.map("map", {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    this.geocoder.getCurrentLocation()
        .subscribe(
            location => map.panTo([location.latitude, location.longitude]),
            err => console.error(err)
        );
    // this.toolbarComponent.Initialize();
    const parentIcon = L.icon({
      iconUrl: "../assets/icon/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor:   [12, 21],
      popupAnchor: [-3, -25],
      shadowUrl: "../assets/icon/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor:   [17, 20],
    });

    const collegeIcon = L.icon({
      iconUrl: "../assets/icon/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor:   [12, 21],
      popupAnchor: [-3, -25],
      shadowUrl: "../assets/icon/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor:   [17, 20],
    });
    /*const testIcon = L.icon.fontAwesome({
      iconClasses: "fa fa-info-circle",
      markerColor: "#00a9ce",
      iconColor: "#FFF"
    });*/
    // add parents to map
    this.parentService.getParents().then(parents => {
      let first = true;
      parents.map(parent => {
        this.geocoder.geocode(parent.address)
            .subscribe(location => {
              // map.fitBounds(location.viewBounds, {});

              if (parent.id === 0) {
                const marker = L.marker([location.latitude, location.longitude], {icon: collegeIcon}).addTo(map);
                marker.bindPopup(`<b>${parent.name}</b>`);
                marker.openPopup();
                first = false;
              } else {
                const marker = L.marker([location.latitude, location.longitude], {icon: parentIcon}).addTo(map);
                marker.bindPopup(`<b>${parent.name}(<i>${parent.phone}</i>)</b><br>${parent.needs}<hr>${parent.capacities}`);
              }
            }, error => console.error(error));
      });
    });
  }
}
