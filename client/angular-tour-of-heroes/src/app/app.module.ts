import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule} from '@angular/common/http'
import { FormsModule, NgForm } from '@angular/forms';
//Comps
import { MatSliderModule } from '@angular/material/slider';
import { PostComponent } from './comps/post/post.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FeedComponent } from './comps/feed/feed.component';
import { AddPostComponent } from './comps/add-post/add-post.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { ProfileComponent } from './comps/profile/profile.component';
import { TaskComponent } from './comps/task/task.component';
import { AddTaskComponent } from './comps/add-task/add-task.component';
@NgModule({
  declarations: [
    AppComponent, PostComponent, FeedComponent, AddPostComponent, NavbarComponent, ProfileComponent, TaskComponent, AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
