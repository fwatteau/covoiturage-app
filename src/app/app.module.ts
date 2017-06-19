import "leaflet";
import "leaflet-fontawesome-markers";
import "leaflet.vectorgrid";

import "font-awesome/css/font-awesome.css";
import "leaflet/dist/leaflet.css";
import "leaflet-fontawesome-markers/L.Icon.FontAwesome.css";
import "leaflet-fontawesome-markers/L.Icon.FontAwesome.js";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {MapService} from "../services/map.service";
import {GeocodingService} from "../services/geocoding.service";
import {ParentService} from "../services/parent.service";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, CommonModule, NgbModule.forRoot()
  ],
  providers: [MapService,
    GeocodingService, ParentService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
