import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  category: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(
    private categorySerivce: CategoryService,
    private router: Router
  ) {
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
          this.router.navigateByUrl('/admin/categories');
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
