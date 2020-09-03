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

  private apidata: Array<any>;
  public showdata: Array<Array<any>> = [];
  public quantity: number;
  public imagesUrl = environment.images_url;

  public pagination = {
    size: 20,
    page: 0
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data: any) => {
      this.apidata = data.body;
      this.quantity = data.body.length;
      this.paginate(data.body);
    }, error => {
      console.log(error);
    });
  }

  private paginate = async (array: Array<any>): Promise<void> => {
    const pages = await Math.ceil(array.length / this.pagination.size);
    this.showdata = new Array<Array<any>>(pages);
    this.quantity = array.length;
    for (let i = 0; i < pages; i++) {
      const start = await this.pagination.size * i
      this.showdata[i] = await new Array<any>(...array.slice(start, start + this.pagination.size));
    }
  }

  public goToRecipe(id: string) {
    this.router.navigate(['recipe', id]);
  }
 

}
