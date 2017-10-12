import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class RestApiServiceProvider {
  public
    // url = "http://localhost:3000/"
    url = "https://api.technolia.fr/"

  constructor(public http: Http) {
  }

  getSpots(){
    var header = new Headers({ accept : 'application/json'});
    var options = new RequestOptions({ headers: header,method : 'get'});
    var data = this.http.get("https://api.technolia.fr/spots?limit=10000",options)
      .map((res:Response) => res.json())
      .catch(this.handleError);
    return data;
  };

  getStatuts(){
    var header = new Headers({ accept : 'application/json'});
    var options = new RequestOptions({ headers: header,method : 'get'});
    return this.http.get(this.url+"spots/logs/current_statuses",options)
      .map((res:Response) => res.json())
      .catch(this.handleError);
  };

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}