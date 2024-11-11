import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  addCategory: AddCategoryRequest;

  constructor() {
    this.addCategory = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit(): void {}
}
