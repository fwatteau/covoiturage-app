import {Component, Input, OnInit} from "@angular/core";

import {AuthentificationService} from "../../services/authentification.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Parent} from "../../model/parent.class";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthentificationService, NgbActiveModal]
})
export class LoginComponent implements OnInit {
  public email = "";
  public errorMsg = "";
  @Input()
  logged: Parent = null;

  constructor(private router: Router, private _authService: AuthentificationService) {

  }

  ngOnInit(): void {
    if (this._authService.getConnectedUser()) {
      this.router.navigate(["map"]);
    }
  }

  login() {
    this.logged = this._authService.login(this.email);
    if (this.logged) {
      this.router.navigate(["map"]);
    } else {
      this.errorMsg = "Le compte " + this.email + " n'est pas connu, en cas de problème contacter collegecommunautaire@nordnet.fr";
    }
  }
}
