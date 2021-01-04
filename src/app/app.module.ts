import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';

import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule, 
    AngularFirestoreModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase, 'zowar'),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
