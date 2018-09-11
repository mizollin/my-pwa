import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { take, map, tap } from 'rxjs/operators';
import { Observable, ReplaySubject, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyPwa!';
  date$: Observable<any>;
  secondDate$: Observable<any>;
  thirdDate$: Observable<any>;

  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private http: HttpClient) {
    swUpdate.available.subscribe(() => {
      alert('update available');
    });

    interval(10000).pipe(tap(() => {
      console.log('UPDATE CHECK');
      swUpdate.checkForUpdate();
    })).subscribe();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.date$ = this.http.get('http://localhost:3000/first').pipe(
      map((res) => res)
    );

    this.secondDate$ = this.http.get('http://localhost:3000/second').pipe(
      map((res) => res)
    );

    this.thirdDate$ = this.http.get('http://localhost:3000/third').pipe(
      map((res) => res)
    );
  }


}
