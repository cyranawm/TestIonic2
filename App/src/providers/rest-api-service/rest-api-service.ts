import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


import {Spot} from './spot';

/*
  Generated class for the RestApiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestApiServiceProvider {
  public
  spots:any;

  constructor(public http: Http) {
  }

  getAllSpots(): Observable<Spot[]>{
      var header = new Headers({ 'Accept': 'application/json'});
      var options = new RequestOptions({ headers: header});
      return this.http.get("http://localhost:3000/markers",options)
      .map((res:Response) => res.json())
      .catch(this.handleError);
    };

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

    /*var spot = this.spots["spots"];
    var tableau = new Array();
    
    for (spot in spot){
      var lat = spot["location"]["gps"]["latitude"];
      var lng = spot["location"]["gps"]["longitude"];
      var id = spot["id"];
      var type_spot = spot["spot_type"];
      var address = spot["location"]["address"];
      var city = spot["location"]["town"];
      
  };


    
            lat = spot["location"]["gps"]["latitude"]
            lng = spot["location"]["gps"]["longitude"]
            id = spot["id"]
            type_spot = spot["spot_type"]
            address = spot["location"]["address"]
            city = spot["location"]["town"]
            links = spot["links"]["device"]["href"]
       a = Geokit::LatLng.new(lat,lng)
       b = Geokit::LatLng.new(params[:lat],params[:lng])
      distance=a.distance_to(b)
      distance=(distance*1.609).round(2) #passage de miles en KM
        if distance <= 20
          tableau.push("id" => id,"longitude" => lng ,"latitude" => lat, "distance" => distance, "spot_type" => type_spot, "address" => address,"city"=>city,"links" =>links)                
        end
      end
    response.headers['Content-Type'] = 'application/json'
    render :text => tableau.to_json, :layout => false
    rescue
    end
  */


}