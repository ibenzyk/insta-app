import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { TagSearchServiceService } from './tag-search-service.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [TagSearchServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
