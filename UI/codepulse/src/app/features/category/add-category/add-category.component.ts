import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  category: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categorySerivce: CategoryService) {
    this.category = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit(): void {
    this.addCategorySubscription = this.categorySerivce
      .addCategory(this.category)
      .subscribe({
        next: (response) => {
          console.log('this was successful');
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
