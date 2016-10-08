import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Level} from '../../level.ts';


@Injectable()
export class LevelService {
  levelsUrl = "/api/levels"

  constructor(public http: Http) {}
  load(): Observable<Level[]> {
    return this.http.get(this.levelsUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }
  add(level: Level): Observable<Level> {
    let body = JSON.stringify(level);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.levelsUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  delete(level: Level) {
    let url = `${this.levelsUrl}/${level._id}`;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(url, headers)
               .catch(this.handleError);
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
