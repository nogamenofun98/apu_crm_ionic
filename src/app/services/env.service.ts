import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    CAS_URL = 'https://cas.apiit.edu.my/';
    API_URL = 'http://localhost:5000/';
    SERVICE_URL = 'http://test.com/';
    isMD = (this.platform.is('mobile') || this.platform.is('mobileweb'));

    constructor(private platform: Platform) {
    }
}
