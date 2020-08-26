import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import {UsersService} from 'src/app/services/users.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  public recipe = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipeById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      console.log(data)
      this.recipe = data.body
    }, error => console.log(error));
    // this.userService.
  }

}
