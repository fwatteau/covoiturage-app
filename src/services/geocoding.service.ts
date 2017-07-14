import {Http, Response} from "@angular/http";
import {Location} from "../model/location.class";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    geocode(address: string) {
        return this.http
            // .get(`https://maps.googleapis.com/maps/api/geocode/json?key=${environment.apiKey}&address=${encodeURIComponent(address)}`)
            .get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&autocomplete=0&limit=1`)
            .map(res => res.json())
            .map(result => {
                if (!result.features || ! (result.features  instanceof Array) || result.features.length === 0) {
                    throw new Error("unable to geocode address");
                }

                const location = new Location();
                location.address = result.features[0].formatted_address;
                location.latitude = result.features[0].geometry.coordinates[1];
                location.longitude = result.features[0].geometry.coordinates[0];

                /*const viewPort = result[0].boundingbox;
                location.viewBounds = L.latLngBounds(
                    {
                        lat: viewPort[0],
                        lng: viewPort[2]
                    },
                  {
                    lat: viewPort[1],
                    lng: viewPort[3]
                  });
*/
                return location;
            });
    }

    getCurrentLocation() {
        return this.http
            .get("http://ipv4.myexternalip.com/json")
            .map(res => res.json().ip)
            .flatMap(ip => this.http.get("http://freegeoip.net/json/" + ip))
            .map((res: Response) => res.json())
            .map(result => {
                const location = new Location();

                location.address = result.city + ", " + result.region_code + " " + result.zip_code + ", " + result.country_code;
                location.latitude = result.latitude;
                location.longitude = result.longitude;

                return location;
            });
    }
}
