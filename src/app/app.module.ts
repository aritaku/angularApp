import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonpModule } from "@angular/http";
import { HttpService } from "./http.service";
import { Ng2BootstrapModule } from "ng2-bootstrap/ng2-bootstrap";
import {DetailComponent} from "./detail.component";

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    Ng2BootstrapModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
