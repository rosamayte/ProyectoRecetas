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
    SearchUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
