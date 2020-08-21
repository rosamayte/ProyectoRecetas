import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './login.guard';
import { MainComponent } from './pages/main/main.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchRecipesComponent } from './pages/search-recipes/search-recipes.component';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { SearchUsersComponent } from './pages/search-users/search-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '', component: MainComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'recipes', component: SearchRecipesComponent },
  { path: 'users', component: SearchUsersComponent },
  { path: 'recipe/:id', component: ViewRecipeComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
