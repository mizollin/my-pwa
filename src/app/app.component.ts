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
  title = 'My Pwa!';
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

  enablePush() {
    this.swPush.requestSubscription(
      {serverPublicKey: 'BM7wU4W9tLBRKRVIz3eaORb9r2tDeVCjb-Ck9BCMQGYdGgzUywsCBt0zTtGEzgVpNCJvOJPC6IcvMxnHBi0mec4'}
    ).then((sub) => {
      console.log('PUSH SUB: ', sub);
      this.subscribePush(sub);
    });
  }

  subscribePush(sub: PushSubscription) {
    console.log('subscribePush');
    this.http.post('http://localhost:3000/subscribe', sub).pipe(
      tap((res) => {
        console.log(res);
      })
    ).subscribe();
  }

  notifyMe() {
    console.log('notifyMe');
    this.http.post('http://localhost:3000/notifyme', {}).subscribe();
  }
}
