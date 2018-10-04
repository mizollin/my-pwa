import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
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
