/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {EnvService} from './env.service';
import {AuthService} from './auth.service';
import {AlertService} from './alert.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private env: EnvService, private http: HttpClient, private authService: AuthService, private alertService: AlertService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // console.log('request intercepted successfully!');
        if (req.url.includes(this.env.CAS_URL)) {
            return next.handle(req);
        }
        // console.log('non CAS url: ' + req.url);
        return from(this.getServiceParams()).pipe(switchMap(params => {
            // tslint:disable-next-line:no-shadowed-variable
            const authReq = req.clone({
                params: params
            });
            return next.handle(authReq).pipe(catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    // console.error(err);
                    this.alertService.presentToast(err.message, 'danger', 0, true);
                    return throwError(err);
                }
            }));
        }));
    }

    async getServiceParams() {
        let tgt, serviceTicket = '';
        await from(this.authService.getTGT()).toPromise().then(value => {
            tgt = value;
        });
        await this.authService.getServiceTicket(tgt).toPromise().then(value => {
            serviceTicket = value;
        });
        return new HttpParams()
            .set('service', this.env.SERVICE_URL)
            .set('ticket', serviceTicket);
    }


}
