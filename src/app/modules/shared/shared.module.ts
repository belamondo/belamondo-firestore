import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatToolbarModule,
  MatGridListModule
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { MenuComponent } from './components/menu/menu.component';

/**
 * Modules
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Services
 */
import { AuthenticationService } from './services/authentication.service';

/**
 * Settings
 */
 import { environment } from './../../../environments/environment'

/**
 * Third-party package
 */
import 'hammerjs';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    ReactiveFormsModule,
    TextMaskModule
  ], exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MenuComponent,
    ReactiveFormsModule,
    TextMaskModule
  ], declarations: [
    MenuComponent
  ], providers: [
    AuthenticationService
  ]
})
export class SharedModule {

}
