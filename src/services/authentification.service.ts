import {Injectable} from "@angular/core";

import "rxjs/add/operator/find";
import "rxjs/add/operator/map";
import {ParentService} from "./parent.service";
import {Parent} from "../model/parent.class";

@Injectable()
export class AuthentificationService {
    private parents: Parent[];

    constructor(private parentService: ParentService) {
        this.parentService.getParents().then(val => {
            this.parents = val;
            }
        );
    }

    logout() {
        localStorage.removeItem("parent");
    }

    login(email): Parent {
        const authenticatedParent = this.parents.find(p => p.mail.toUpperCase() === email.toUpperCase());
        if (authenticatedParent) {
            localStorage.setItem("parent", JSON.stringify(authenticatedParent));
        }
        return authenticatedParent;
        /*this.parentService.getParents()
            .then(val => {
                const authenticatedParent = val.find(p => p.mail === email);
                if (authenticatedParent) {
                    localStorage.setItem("parent", JSON.stringify(authenticatedParent));
                }
            });

        */
    }

    getConnectedUser(): Parent {
        return (localStorage.getItem("parent") ? JSON.parse(localStorage.getItem("parent")) as Parent : null);
    }
}
