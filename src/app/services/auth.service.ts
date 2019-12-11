/* tslint:disable:object-literal-shorthand object-literal-key-quotes max-line-length */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EnvService} from './env.service';
import {Storage} from '@ionic/storage';
import {map, switchMap, tap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {HttpRequestService} from './http-request.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    tgt: any;
    private headers: HttpHeaders;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService,
        private httpRequestService: HttpRequestService,
    ) {
        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Accept': 'text/plain',
            'Content-Type': 'application/x-www-form-urlencoded',
        });
    }

    // login(username: string, password: string) {
    login(data: HttpParams) {
        return this.http.post(this.env.CAS_URL + 'cas/v1/tickets/',
            data.toString(), {headers: this.headers, responseType: 'text'}
        ).pipe( // how about using subscribe here?
            switchMap(tgt => { // might need to console.log this tgt to see what return from api
                return this.getServiceTicket(tgt).pipe(map(serviceTicket => {
                    return {tgt: tgt, serviceTicket: serviceTicket};
                }));
            }),
        );
    }

    logout(tgt: string) {
        return this.http.delete(this.env.CAS_URL + 'cas/v1/tickets/' + tgt, {headers: this.headers, responseType: 'text'})
            .pipe(
                tap(data => {
                    this.storage.remove('tgt');
                    this.isLoggedIn = false;
                    delete this.tgt;
                    return data;
                })
            );
    }

    getUser() {
        // const params = new HttpParams()
        //     .set('service', this.env.SERVICE_URL)
        //     .set('tgt', this.tgt);
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        return this.http.get<any>(this.env.API_URL + 'auth/', {headers: headers})
            .pipe(
                tap(user => {
                    // console.log(user.data_response);
                    return user.data_response;
                })
            );
    }

    getTGT(): Observable<any> {
        return from(this.storage.get('tgt')).pipe(
            tap(tgt => {
                // console.log('auth service: ', tgt);
                if (tgt !== null) {
                    return from(this.getTGTStatus(tgt)).subscribe(
                        data => {
                            this.tgt = data;
                            if (this.tgt != null) {
                                // console.error('auth service: is login');
                                this.isLoggedIn = true;
                            } else {
                                this.isLoggedIn = false;
                            }
                            return this.tgt;
                        },
                        error => {
                            console.error('auth service: tgt invalid, logout now');
                            this.storage.remove('tgt');
                            this.isLoggedIn = false;
                            delete this.tgt;
                            return null;
                        }
                    );
                }
            })
        );
    }

    getTGTStatus(tgt: string) {
        return this.http.get(this.env.CAS_URL + 'cas/v1/tickets/' + tgt, {headers: this.headers, responseType: 'text'})
            .pipe(
                tap(data => {
                    return data;
                })
            );
    }

    getServiceTicket(tgt: string) {
        const params = new HttpParams()
            .set('service', this.env.SERVICE_URL);
        return this.http.post(this.env.CAS_URL + 'cas/v1/tickets/' + tgt,
            params.toString(), {headers: this.headers, responseType: 'text'}
        ).pipe( // how about using subscribe here?
            tap(serviceTicket => { // might need to console.log this tgt to see what return from api
                // console.log('tgt: ');
                // console.log(tgt);
                return serviceTicket;
            }),
        );
    }

    checkBlacklisted(tgt, serviceTicket) {
        return this.http.get(this.env.CAS_URL + 'cas/p3/serviceValidate?service=' + this.env.SERVICE_URL + '&ticket=' + serviceTicket + '&format=json').toPromise().then(json => {
            let isBlock = false;
            // @ts-ignore
            const memberOfList: any[] = json.serviceResponse.authenticationSuccess.attributes.memberOf;
            memberOfList.forEach(item => {
                if (this.env.blackListMemberOf.includes(item)) {
                    isBlock = true;
                }
            });
            if (isBlock) {
                return true;
            }
            this.storage.set('tgt', tgt);
            this.tgt = tgt;
            this.isLoggedIn = true;
            return false;
        });
    }

    getRoleJson(roleId) {
        return this.httpRequestService.read('roles/' + roleId).then(data => {
            this.storage.set('roleJson', data.data_response.user_role_json);
            return data.data_response.user_role_json;
        });
    }
}
