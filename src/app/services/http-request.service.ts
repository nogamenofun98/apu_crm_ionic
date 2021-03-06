import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {
    headers: HttpHeaders;

    constructor(private http: HttpClient, private env: EnvService) {
        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });

    }

// .catch((error) => {
//     console.error(url + ': ' + error);
//     return error;
// })

    create(url: string, body: string, headers: HttpHeaders = null): Promise<any> {
        headers = (headers == null) ? this.headers : headers;
        return this.http
            .post<any>(this.env.API_URL + url, body, {headers}).toPromise();
    }

    update(url: string, body: string, headers: HttpHeaders = null): Promise<any> {
        headers = (headers == null) ? this.headers : headers;
        return this.http
            .put<any>(this.env.API_URL + url,
                body, {headers}).toPromise();
    }

    read(url: string, headers: HttpHeaders = null): Promise<any> {
        headers = (headers == null) ? this.headers : headers;
        return this.http
            .get<any>(this.env.API_URL + url, {headers}).toPromise();
    }

    delete(url: string, headers: HttpHeaders = null): Promise<any> {
        headers = (headers == null) ? this.headers : headers;
        return this.http
            .delete<any>(this.env.API_URL + url, {headers}).toPromise();
    }
}
