import {Injectable} from "@angular/core";

import "rxjs/add/operator/find";
import {ParentService} from "./parent.service";

@Injectable()
export class AuthentificationService {

    constructor(private parentService: ParentService) {

    }

    logout() {
        localStorage.removeItem("parent");
    }

    login(email) {
        this.parentService.getParents().then(parents => {
            const authenticatedParent =
            parents.find(p => p.mail === email);
            if (authenticatedParent) {
                localStorage.setItem("parent", authenticatedParent.id.toString());
                return true;
            }
        });

        return false;

    }
}