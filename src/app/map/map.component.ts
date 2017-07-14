import { Component, OnInit } from "@angular/core";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {ParentService} from "../../services/parent.service";
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  providers: [AuthentificationService]
})
export class MapComponent implements OnInit {


  constructor(private mapService: MapService, private geocoder: GeocodingService, private router: Router
      , private parentService: ParentService, private authentificationService: AuthentificationService) {

  }

  ngOnInit() {
    const user = this.authentificationService.getConnectedUser();
    if (!user) {
      this.router.navigate(["login"]);
    }

    const map = L.map("map", {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({position: "topright"}).addTo(map);
    // L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    this.geocoder.getCurrentLocation()
        .subscribe(
            location => map.panTo([location.latitude, location.longitude]),
            err => console.error(err)
        );

    // this.toolbarComponent.Initialize();
    const parentIcon = L.icon({
      iconUrl: "assets/icon/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 21],
      popupAnchor: [-3, -25],
      shadowUrl: "assets/icon/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor: [17, 20],
    });

    const collegeIcon = L.icon({
      iconUrl: "assets/icon/logo-cc.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [-3, -25],
    });

    const houseIcon = L.icon({
      iconUrl: "assets/icon/maisonicon.png",
      iconSize: [40, 40],
      iconAnchor: [30, 30],
      popupAnchor: [-3, -25],
    });

    // add parents to map
    this.parentService.getParents().then(parents => {
      for (const parent of parents) {
        this.geocoder.geocode(parent.address)
            .subscribe(location => {
                const phone = parent.phone ? `<div class="p-1"><li class="fa fa-phone"></li> ${parent.phone}</div>` : '';
                const mail = parent.mail ?
                    `<div class="p-1"><li class="fa fa-envelope-o"></li> <a href="mailto:${parent.mail}">${parent.mail}</a></div>`
                    : '';
                const cap = `<div class="p-2 bg-info text-white"><kbd>peut aider à</kbd>&nbsp;${parent.capacities}</div>`;
                const need = `<div class="p-2 bg-warning text-white"><code>a besoin de</code>&nbsp;${parent.needs}</div>`;

              // map.fitBounds(location.viewBounds, {});

              if (parent.id === 0) {
                const marker = L.marker([location.latitude, location.longitude], {icon: collegeIcon}).addTo(map);
                const title = `<h5><i class="fa fa-graduation-cap" aria-hidden="true"></i> ${parent.name}</h5>`;
                const str = `${title}<div class="d-flex flex-wrap justify-content-between">${phone} ${mail}</div>`;

                marker.bindPopup(str);
                if (!user) {
                  marker.openPopup();
                }
              } else if (parent.id === user.id) {
                  const marker = L.marker([location.latitude, location.longitude], {icon: houseIcon}).addTo(map);
                  const title = `<h5><i class="fa fa-home" aria-hidden="true"></i> Votre maison</h5>`;
                  const str = `${title}<div class="d-flex flex-column">${need}${cap}</div>`;

                  marker.bindPopup(str);
                  marker.openPopup();
              } else {
                  const marker = L.marker([location.latitude, location.longitude], {icon: parentIcon}).addTo(map);
                  const title = `<h5><i class="fa fa-child" aria-hidden="true"></i> ${parent.name}</h5>`;
                  const str = `${title}<div class="d-flex flex-wrap justify-content-between">${phone} ${mail}</div>`
                      + `<div class="d-flex flex-column">${need}${cap}</div>`;

                  marker.bindPopup(str);
              }
            }, error => console.error(`Erreur sur le parent ${parent.id} [${parent.address}]: ${error}`));
      }
    });
  }
}
