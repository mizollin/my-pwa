#Offline und Caching mit Service Worker:

##ngsw-config.json:
	"urls": [
	"https://cdn.2bitcloud.ch/**"
	]


	"dataGroups": [
	{
	  "name": "cached",
	  "urls": ["/second"],
	  "cacheConfig": {
		"maxSize": 1,
		"maxAge": "15s",
		"strategy": "performance"
	  }
	},
	{
	  "name": "cached",
	  "urls": ["/thrid"],
	  "cacheConfig": {
		"maxSize": 1,
		"timeout": "500u",
		"maxAge": "15s",
		"strategy": "freshness"
	  }
	}
	]
	
##app.component.html
	
  <h2>Caching</h2>

  <dl>
    <dt>No Configuration</dt>
    <dd>{{date$ | async}}</dd>
    <dt>Performance</dt>
    <dd>{{secondDate$ | async}}</dd>
    <dt>Freshness</dt>
    <dd>{{thirdDate$ | async}}</dd>
  </dl>
  <div>
    <button (click)="refresh()">Refresh</button>
  </div>
  
##app.component.ts

  date$: Observable<any>;
  secondDate$: Observable<any>;
  thirdDate$: Observable<any>;
  
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
  
  
#Update notification:

##app.component.ts

	updateCheck() {
	    this.swUpdate.available.subscribe(() => {
		  alert('update available');
		});

		interval(10000).pipe(tap(() => {
		  console.log('UPDATE CHECK');
		  this.swUpdate.checkForUpdate();
		})).subscribe();
	}


#Push notification:

##app.component.html:

<h2>Push Notifications</h2>

  <div>
    <button (click)="enablePush()">Setup Push</button>
  </div>

  <div>
    <button (click)="notifyMe()">Send Push</button>
  </div>
  
##app.component.ts:

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

