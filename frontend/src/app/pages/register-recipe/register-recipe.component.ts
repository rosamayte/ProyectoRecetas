import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { RecipesService } from 'src/app/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-recipe',
  templateUrl: './register-recipe.component.html',
  styleUrls: ['./register-recipe.component.css']
})
export class RegisterRecipeComponent implements OnInit {

  public quantity: Array<number> = [1];
  public rname: Array<string> = [""];
  public steps: string = null;
  public name: string = null;
  public image: string = null;
  public description: string = null;
  public user = null;
  public larr: Array<null> = [null];

  constructor(
    private recipeService: RecipesService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.userObs.subscribe(u=>{
      this.user = u;
    },error =>{
      this.user = null;
    })
  }

  public addRow() {
    this.quantity.push(1);
    this.rname.push("");
    this.larr.push(null);
  }

  public removeRow() {
    this.quantity.pop();
    this.rname.pop();
    this.larr.pop();
  }

  public create() {
    this.recipeService.createRecipe({
      name: this.name,
      description: this.description,
      ingredients: this.quantity.map((v, i) => ({ quantity: v, name: this.rname[i]})),
      steps: this.steps,
      owner: this.user._id
    }).subscribe(data => {
      Swal.fire('Created','','success')
    }, error=>{
      Swal.fire('Error', '', 'error')
    })
  }

}
