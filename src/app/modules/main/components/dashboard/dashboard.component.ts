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
  public paramsToDataTable: any;

  ngOnInit() {
    this.makeList();
  }

  dealWithOutputFromDataTable = (event) => {
    if(event._actionButtonReference == "edit") {
      window.alert("Tratamento do lado do componente pai")
    }
  }

  makeList = () => {
    this.paramsToDataTable = {
      headerToolbar: {
        title: "Lista de doenças",
        search: true
      },
      list: {
        query: {
          collection: "diseases",
          orderBy: [["cod", "asc"]],
          limit: 10,
        },
        show: ["cod", "description"],
        actionButton: [{
          type: "icon",
          value: "edit"
        }, {
          type: "icon",
          value: "delete"
        }]
      }
    }
  }
}
