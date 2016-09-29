import { Injectable } from '@angular/core';
import { Jsonp,
         URLSearchParams,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';

@Injectable()
export class TagSearchServiceService {

  constructor(private jsonp: Jsonp) { }
  
  searchTag(term: string) {

    let url = `https://api.instagram.com/v1/tags/search`;

    let params = new URLSearchParams();
    params.set('q', term);
    params.set('access_token', '3970663234.b926eae.81bb6b9d69ed40d89b647dc6e72fadfc');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
                .get(url, { search: params })
                .map(this.extractData)
                .catch(this.handleError);
  }

  searchMedia(term: string) {
    
    let url = `https://api.instagram.com/v1/tags/${term}/media/recent`;
    
    let params = new URLSearchParams();
    params.set('access_token', '3970663234.b926eae.81bb6b9d69ed40d89b647dc6e72fadfc');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
                .get(url, { search: params })
                .map(this.extractData)
                .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
