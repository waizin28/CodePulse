import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  category: AddCategoryRequest;

  constructor(private categorySerivce: CategoryService) {
    this.category = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit(): void {
    this.categorySerivce.addCategory(this.category).subscribe({
      next: (response) => {
        console.log('this was successful');
      },
    });
  }
}
