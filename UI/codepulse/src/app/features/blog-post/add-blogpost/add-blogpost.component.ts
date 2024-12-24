import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  addBlogModel: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorOpen: boolean = false;

  imageSelectSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.addBlogModel = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (response) => {
        // update image url if image selected
        this.addBlogModel.featuredImageUrl = response.url;
        // close modal automatically
        this.isImageSelectorOpen = false;
      },
    });
  }

  openImageSelector(): void {
    this.isImageSelectorOpen = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorOpen = false;
  }

  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.addBlogModel).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
    });
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }
}
