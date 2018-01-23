import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/**
 * Firebase sets
 */
import { environment, fbAuth } from './../../../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable()
export class AuthenticationService {
  afsCollection: AngularFirestoreCollection<any>;
  afsResponse$: Observable<any>;

  user$: Observable<any>;

  constructor(
    private _afs: AngularFirestore
  ) { }

  getUser = () => {
    let email = fbAuth.currentUser.email;
    let uid = fbAuth.currentUser.uid;

    this.afsCollection = this._afs.collection('users', ref => ref.where('userId', '==', uid));

    this.afsResponse$ = this.afsCollection.valueChanges();

    this.afsResponse$
    .subscribe(res => {
      this.user$ = res;
    })
  }

  login = (params) => new Promise((resolve, reject) => {
    let login = params.login;
    let password = params.password;
    
    switch(params.loginMode) {
      case 'emailAndPassword':
        fbAuth.signInWithEmailAndPassword(login, password)
        .then(res => {
          if(fbAuth.currentUser.emailVerified) {            
            resolve({
              cod: "l-01",
              message: "Login successful"
            });
          } else {
            console.log(49)
            resolve({
              cod: "l-02",
              message: "Authentication not validated."
            })
          }
        })
        .catch(rej => {
          reject({
            cod: "l-03",
            message: rej
          })
        })
      break;

      default:
        console.log("Escolher loginMode")
    }
  })

  logout = () => new Promise((resolve, reject) => {  
    fbAuth.signOut()
    .then(res => {
      resolve({
        cod: "lo-01",
        message: res
      })
    })
    .catch(rej => {
      reject({
        cod: "lo-02",
        message: rej
      })
    })
  })
  
  recoverPasswordEmail = (email) => new Promise((resolve, reject) => {
    fbAuth.fetchProvidersForEmail(email)
    .then(res => {
      if(res.length > 0) {
        fbAuth.sendPasswordResetEmail(email);

        resolve({
          cod: "rpe-01",
          message: "E-mail enviado. Cheque e finalize o processo."
        })
      } else {
        resolve({
          cod: "rpe-02",
          message: "E-mail não cadastrado."
        })
      }
    });
  })
}
