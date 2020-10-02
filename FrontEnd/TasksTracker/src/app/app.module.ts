import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppCommonModule } from './app-common/app-common.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmptyStringInterceptor } from './core/interceptors/empty-string.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TasksModule,
    CoreModule,
    SharedModule,
    AppCommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: EmptyStringInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
