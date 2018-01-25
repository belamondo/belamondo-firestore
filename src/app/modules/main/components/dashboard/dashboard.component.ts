import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/**
 * Firebase sets
 */
import { environment, fbAuth } from './../../../../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  disease: any;

  afsCollection: AngularFirestoreCollection<any>;
  afsResponse$: Observable<any>;

  constructor(private _afs: AngularFirestore) { }

  ngOnInit() {
    this.disease = {
    }
  }

  onClick = () => {
    //let key;
    this.afsCollection = this._afs.collection('diseases');

    /*for(key in this.disease) {
      this.afsCollection.add(this.disease[key]);
    }*/
    
    this.afsResponse$ = this.afsCollection.valueChanges();

    this.afsResponse$
    .subscribe(res => {
      console.log(res)
    })
  }
}
