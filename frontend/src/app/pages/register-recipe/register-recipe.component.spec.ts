import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRecipeComponent } from './register-recipe.component';

describe('RegisterRecipeComponent', () => {
  let component: RegisterRecipeComponent;
  let fixture: ComponentFixture<RegisterRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
