import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  // Vista de buscador 
  private apidata: Array<any>;
  public showdata: Array<Array<any>> = [];
  public quantity: number;
  //  
  public imagesUrlUsers = `${environment.images_url}users/`;
  public user = null;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.apidata = data.body;
      this.quantity = data.body.length;
      this.paginate(data.body);
    }, error => {
      console.log(error);
    });
  }

  // Vista de buscador
  public sort = {
    name: 0,
    date: 0
  }
  public pagination = {
    size: 10,
    page: 0
  }

  public sizes: Array<number> = [5, 10, 20, 50];

  public searchText = '';

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

  public changeSize = (value: number): void => {
    this.pagination.size = value;
    this.pagination.page = 0;
    this.paginate(this.apidata);
  }

  public search = (value: string): void => {
    const temp = this.apidata.filter((e: any) => e.name.toLowerCase().includes(value.toLowerCase()));
    this.paginate(temp);
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
  // 
  public profile(id: string) {
    this.router.navigate(['profile', id]);
  }

}
