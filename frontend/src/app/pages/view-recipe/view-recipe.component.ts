import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  public recipe = null;
  public owner = null;
  public stars = [];
  public imagesUrl = environment.images_url;
  private canVote = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipeById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data: any) => {
      console.log(data);
      this.calcStars(data.body.votes)
      this.recipe = data.body
      this.userService.getUser(data.body.owner).subscribe((data2: any) => {
        console.log(data2)
        this.owner = data2.body
      }, error => console.log(error));
    }, error => console.log(error));
  }
  public voteUp(i:number){
    if(!this.canVote){
      return null
    }
    this.recipeService.voteUp({id: this.recipe._id,v: i+1}).subscribe((data2: any) => {
      console.log(data2)
      this.canVote = false;
      this.recipe.votes[0]+= i+1
      this.recipe.votes[1]++
      this.calcStars(this.recipe.votes)
      Swal.fire('Voted', '','success')
    }, error => console.log(error));
  }

  private calcStars(votes){
    let q = votes[0] / votes[1];
    this.stars = [];
    for (let i = 0; i < 5; i++) {
        if (q >= 1) {
          this.stars.push(1)
        } else if (q >= 0.5) {
          this.stars.push(0)
        } else {
          this.stars.push(-1)
        }
        q--
      }
  }
}
