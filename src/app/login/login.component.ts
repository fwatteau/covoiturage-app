import { Component } from "@angular/core";

import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthentificationService]
})
export class LoginComponent {
  public email = "";
  public errorMsg = "";

  constructor(private _authService: AuthentificationService) { }

  login() {
    if (!this._authService.login(this.email)) {
      this.errorMsg = "Failed to login";
    }
  }
}
