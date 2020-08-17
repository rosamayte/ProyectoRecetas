import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent implements OnInit {
  private apidata: Array<any>;
  public showdata: Array<Array<any>> = [];
  public quantity: number;

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
    this.paginate(this.apidata)
  }

  public search = (value: string): void => {
    const temp = this.apidata.filter((e: any) => e.name.toLowerCase().includes(value.toLowerCase()));
    this.paginate(temp);
  }

  constructor() { }

  ngOnInit(): void {

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

}
