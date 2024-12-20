import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  routeSubscription?: Subscription;
  blogPostModel?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService
  ) {}

  // get route param
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        // same name id defined at routing module
        this.id = params.get('id');

        // get blogpost info from api
        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blogPostModel = response;
              // Get all the categories that are selected for this particular blog post
              this.selectedCategories = response.categories.map((x) => x.id);
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
