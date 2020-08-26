import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private url = environment.recipes_url;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getRecipes = () => {
    return this.httpClient.get(this.url).pipe(map(data => data));
  }

  public getRecipeById = (id: string) =>{
    return this.httpClient.get(`${this.url}recipe/${id}`).pipe(map(data => data));
  }

}
