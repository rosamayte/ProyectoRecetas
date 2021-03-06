import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public showuser = null;
  public user = null;
  public editImageForm: FormGroup;
  public imageUrl;
  public imagesUrlUsers = `${environment.images_url}users/`;
  public imagesUrlRecipes = `${environment.images_url}recipes/`;
  public showdata: Array<Array<any>> = [];
  private apidata: Array<any>;
  public quantity: number;
  public searchText = '';
  
  public sort = {
    name: 0,
    date: 0
  }
  public pagination = {
    size: 5,
    page: 0
  }

  public sizes: Array<number> = [5, 10, 20, 50];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.userObs.subscribe(u=>{
      this.user = u;
    },error =>{
      this.user = null;
    })

    this.userService.getUser(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.showuser = data.body;
    }, error =>{
      this.showuser = null;
    });
    
    this.recipeService.getRecipeByUser(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data2: any) => {
      this.apidata = data2.body;
      this.quantity = data2.body.length;
      this.paginate(data2.body);
    }, error => {
      this.apidata = [];
      this.quantity = 0;
      this.paginate([]);
    });

    this.editImageForm = this.formBuilder.group({
      image: new FormControl(null,[Validators.required])
    })
  }

  public changePage = (value: number | boolean): void => {
    if (typeof value === 'number') {
      this.pagination.page = value;
    } else {
      if (value) {
        this.pagination.page++
      } else {
        this.pagination.page--
      }
    }
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

  public search = (value: string): void => {
    const temp = this.apidata.filter((e: any) => e.name.toLowerCase().includes(value.toLowerCase()));
    this.paginate(temp);
  }

  public changeSize = (value: number): void => {
    this.pagination.size = value;
    this.pagination.page = 0;
    this.paginate(this.apidata);
  }

  public goToRecipe(id: string) {
    this.router.navigate(['recipe', id]);
  }
  
  public addRecipe(){
    this.router.navigate(['registerrecipe'])
  }

  showForm(){
    console.log(this.editImageForm.value)
  }

  showPreview(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.editImageForm.patchValue({image:file})
    this.editImageForm.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = ()=>{
      this.imageUrl = reader.result as string
    }
    reader.readAsDataURL(file)
  }

}
