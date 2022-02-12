import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HideAfterDirective } from './hide-after.directive';
import { IfLoadedDirective } from './if-loaded.directive';

@NgModule({
  declarations: [
    AppComponent,
    HideAfterDirective,
    IfLoadedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
