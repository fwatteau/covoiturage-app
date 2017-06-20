///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Parent} from "../model/parent.class";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ParentService  {

    constructor(private http: Http) {

    }

    getParents(): Promise<Parent[]> {
        return this.http.get("./assets/parent.json")
            .toPromise()
            .then(response => response.json() as Parent[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
