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

  public getRecipeById = (id: string) => {
    return this.httpClient.get(`${this.url}recipe/${id}`).pipe(map(data => data));
  }

  public getRecipeByUser = (id: string) => {
    return this.httpClient.get(`${this.url}user/${id}`).pipe(map(data => data));
  }

  public voteUp = (body) => {
    return this.httpClient.patch(`${this.url}voteup`, body).pipe(map(data => data));
  }

  public getRecipesTop = ()=>{
    return this.httpClient.get(`${this.url}top/6`).pipe(map(data => data));
  }

  public createRecipe = (body) =>{
    return this.httpClient.post(`${this.url}`, body).pipe(map(data => data));
  }
}
