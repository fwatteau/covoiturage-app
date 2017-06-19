import { Component } from "@angular/core";

import {AuthentificationService} from "../../services/authentification.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthentificationService, NgbActiveModal]
})
export class LoginComponent {
  public email = "f.watteau@gmail.com";
  public errorMsg = "";

  constructor(private _modal: NgbActiveModal, private _authService: AuthentificationService) {

  }

  login() {
    if (!this._authService.login(this.email)) {
      this.errorMsg = "Votre compte n'est pas connu";
    } else {
      this._modal.close("Login success");
    }
  }
}
