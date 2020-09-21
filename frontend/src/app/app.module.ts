import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterRecipeComponent } from './pages/register-recipe/register-recipe.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { SearchRecipesComponent } from './pages/search-recipes/search-recipes.component';
import { NavbarComponent } from './helpers/navbar/navbar.component';
import { SearchUsersComponent } from './pages/search-users/search-users.component';
import { HttpClientModule } from '@angular/common/http';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    RegisterUserComponent,
    RegisterRecipeComponent,
    LoginComponent,
    ViewRecipeComponent,
    SearchRecipesComponent,
    NavbarComponent,
    SearchUsersComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
