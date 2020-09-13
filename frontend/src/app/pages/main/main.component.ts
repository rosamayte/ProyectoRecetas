import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public showdata: Array<Array<any>> = [];
  public imagesUrlRecipes = `${environment.images_url}recipes/`;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipesTop().subscribe((data: any) => {
      this.showdata = data.body;
    }, error => {
      console.log(error);
    });
  }

  private filterTop = async (array: Array<any>): Promise<void> => {

  }

  public goToRecipe(id: string) {
    this.router.navigate(['recipe', id]);
  }
 
}
