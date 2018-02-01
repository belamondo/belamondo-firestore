import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  @Output() outputFromDataTableList = new EventEmitter;

  private afsCollection: AngularFirestoreCollection<any>;
  private afsResponse$: Observable<any>;

  //properties to make data list and its query
  private collection: string;
  private limit: string;
  private orderBy: string = "";
  private outterData: any;
  private where: string = "";
  private searchString: string = "";

  public error: any = [];
  public dataToTable: any;
  public getScrollEvent: any;
  public getShowInput: any;
  public loading: boolean;
  public search: FormControl;

  constructor(
    private _afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.search = new FormControl();

    this.makeList();
  }

  actionButtonOutput = (data, buttonReference) => {
    data._actionButtonReference = buttonReference;

    this.outputFromDataTableList.emit(data);
  }

  clearScroll = () => {
    clearTimeout(this.getScrollEvent);
  }

  clearSearch = () => {
    clearTimeout(this.getShowInput);
  }

  makeList = () => {
    if(this.params) {
      //Tratamento de parâmetros e erros: início
      
      //@param collection: string
      if(!this.params.list.query.collection) {
        //@param outterData: Array<any>
        if(!this.params.list.query.outterData) {
          this.error.push({
            cod: 'dt-err-02',
            message: 'Declarar coleção (params.list.query.collection: string) para consulta ou enviar vetor (params.list.query.outterData: Array(Object)) para montagem da lista'
          })
        }
      } else if(this.params.list.query.collection && this.params.list.query.outterData) {
        this.error.push({
          cod: 'dt-err-03',
          message: 'Se declarar coleção (params.list.query.collection: string), não se pode ter ao mesmo tempo um vetor (params.list.query.outterData: Array(Object)) para montagem de lista, e vice-versa'
        })
      } else {
        if(this.params.list.query.collection) {
          this.collection = "";
          this.limit = "";
          this.orderBy  = "";
          this.outterData = [];
          this.where = "";

          this.collection = this.params.list.query.collection;
        } else {
          this.outterData = this.params.list.query.outterData;
        }
      }

      //@param page: number
      if(!this.params.page) {
        this.params.page = 1;
      } else {
        this.params.page = this.params.page;
      }

      //@param limit: number
      if(!this.params.list.query.limit) {
        this.limit = ".limit("+ (this.params.page * 5) +")"
      } else {
        this.limit = ".limit("+ (this.params.page * this.params.list.query.limit) +")"
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
      if(this.params.list.query.orderBy) {
        for(let lim = this.params.list.query.orderBy.length, i = 0; i < lim; i++) {
          this.orderBy += ".orderBy('"+this.params.list.query.orderBy[i][0] + "', '" + this.params.list.query.orderBy[i][1] + "')"; 
        }
      }

      //@param actionButton: Array<any> - e.g.: actionButton: [{ type: 'icon', value: 'menu' }, { type: 'raised', value: 'Editar' }, { type: 'default', value: 'Entrar' }]

      //@param searchString
      if(this.params.inputToSearch) {
        if(this.params.inputToSearch != "") {
          for(let lim = this.params.list.show.length, i = 0; i < lim; i++) {
            if(typeof this.params.inputToSearch == "number") {
              this.searchString += ".where('" + this.params.list.show[i] + "', '>', " + this.params.inputToSearch + ")"
            } else {
              this.searchString += ".where('" + this.params.list.show[i] + "', '>', '" + this.params.inputToSearch + "')"
            }
          }
        }
      }

      //Tratamento de parâmetros e erros: fim

      if(this.error.length < 1) {
        if(this.params.list.query.collection) {
          let query = "this._afs.collection('" + this.collection + "', ref => ref" + this.limit + this.orderBy + this.where + this.searchString + ")";
          console.log(query)
          this.afsCollection = eval(query);

          this.afsResponse$ = this.afsCollection.valueChanges();

          this.afsResponse$
          .subscribe(res => {
            this.dataToTable = res.map(data => {
              let temp = [];

              for(let lim = this.params.list.show.length, i = 0; i < lim; i++){
                temp.push(data[this.params.list.show[i]]);
              }

              this.loading = false;
              
              return temp;
            })
          })
        } else { //params.list.query.outterData

        }
      }
    } else {
      this.error.push({
        cod: 'dt-err-01',
        message: 'Declarar os parâmetros mínimos do componente'
      })
    }
  }

  onScroll = (event) => {
    this.clearScroll();

    this.getScrollEvent = setTimeout(() => {
      if(this.params.page == 1) {
        if(event.target.scrollTop == 170) {
          this.pageUp();
        }
      } else {
        if(event.target.scrollTop == ((this.params.page - 1) * 370) + 170) {
          this.pageUp();
        }
      }
    }, 1000)
  }

  onSearch = (inputToSearch) => {
    this.clearSearch();

    this.getShowInput = setTimeout(() => {
      this.params.inputToSearch = inputToSearch;

      this.makeList();
    }, 1000)
  }

  pageUp = () => {
    this.params.page += 1;
    this.loading = true;
    
    this.makeList();
  }
}
