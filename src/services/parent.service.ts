///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Http} from "@angular/http";
import {Injectable, OnInit} from "@angular/core";
import {Parent} from "../model/parent.class";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ParentService {
    private parents: Parent[];

    private static handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
        this.http.get("./assets/parent.json")
            .toPromise()
            .then(response => response.json() as Parent[])
            .then(p => {
                console.log(p);
                this.parents = p; })
            .catch(ParentService.handleError);
    }

    getParents(): Parent[] {
        return this.parents;
    }
}
