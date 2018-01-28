import { Component, Input, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/**
 * Firebase sets
 */
import { environment, fbAuth } from './../../../../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'belamondo-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  @Input() params;

  private afsCollection: AngularFirestoreCollection<any>;
  private afsResponse$: Observable<any>;

  //properties to make data list and its query
  private collection: string;
  private limit: string;
  private orderBy: string = "";
  private outterData: any;
  private where: string = "";

  public error: any = [];

  constructor(
    private _afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.makeList();
  }

  makeList = () => {
    if(this.params) {
      //Tratamento de parâmetros e erros: início
      
      //@param collection: string
      if(!this.params.collection) {
        //@param outterData: Array<any>
        if(!this.params.outterData) {
          this.error.push({
            cod: 'dt-err-02',
            message: 'Declarar coleção (params.collection: string) para consulta ou enviar vetor (params.outterData: Array(Object)) para montagem da lista'
          })
        }
      } else if(this.params.collection && this.params.outterData) {
        this.error.push({
          cod: 'dt-err-03',
          message: 'Se declarar coleção (params.collection: string), não se pode ter ao mesmo tempo um vetor (params.outterData: Array(Object)) para montagem de lista, e vice-versa'
        })
      } else {
        if(this.params.collection) {
          this.collection = "";
          this.limit = "";
          this.orderBy  = "";
          this.outterData = [];
          this.where = "";

          this.collection = this.params.collection;
        } else {
          this.outterData = this.params.outterData;
        }
      }

      //@param page: number
      if(!this.params.page) {
        this.params.page = 1;
      } else {
        this.params.page = this.params.page;
      }

      //@param limit: number
      if(!this.params.limit) {
        console.log(this.params.page);
        this.limit = ".limit("+ (this.params.page * 5) +")"
      } else {
        console.log(this.params.page);
        this.limit = ".limit("+ (this.params.page * this.params.limit) +")"
      }

      //@param where: Array<Array> - e.g.: where: [['field1', '==', 'value1'], ['field2', '<=', 1000]]
      if(this.params.where) {
        for(let lim = this.params.where.length, i = 0; i < lim; i++) {
          if(typeof this.params.where[i][2] == "number") {
            this.where += ".where('"+this.params.where[i][0] + "', '" + this.params.where[i][1] + "', " +  this.params.where[i][2] + ")"; 
          } else {
            this.where += ".where('"+this.params.where[i][0] + "', '" + this.params.where[i][1] + "', '" +  this.params.where[i][2] + "')"; 
          }
        }
      }

      //@param orderBy: Array<Array> - e.g.: orderBy: [['field1', 'desc'], ['field2', 'asc']]
      if(this.params.orderBy) {
        for(let lim = this.params.orderBy.length, i = 0; i < lim; i++) {
          this.orderBy += ".orderBy('"+this.params.orderBy[i][0] + "', '" + this.params.orderBy[i][1] + "')"; 
        }
      }
      //Tratamento de parâmetros e erros: fim

      if(this.error.length < 1) {
        if(this.params.collection) {
          let query = "this._afs.collection('" + this.collection + "', ref => ref" + this.limit + this.orderBy + this.where + ")";
          console.log(query);

          this.afsCollection = eval(query);

          this.afsResponse$ = this.afsCollection.valueChanges();

          this.afsResponse$
          .subscribe(res => {
            console.log(res)
          })
        } else { //params.outterData

        }
      }
    } else {
      this.error.push({
        cod: 'dt-err-01',
        message: 'Declarar os parâmetros mínimos do componente'
      })
    }
  }

  pageUp = () => {
    this.params.page += 1;
    this.makeList();
  }
}
