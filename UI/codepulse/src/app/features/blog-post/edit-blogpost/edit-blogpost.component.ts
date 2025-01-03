import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  blogPostModel?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorOpen: boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router
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
          this.getBlogPostSubscription = this.blogPostService
            .getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.blogPostModel = response;
                // Get all the categories that are selected for this particular blog post
                this.selectedCategories = response.categories.map((x) => x.id);
              },
            });
        }

        this.imageSelectSubscription = this.imageService
          .onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.blogPostModel) {
                // update image url if image selected
                this.blogPostModel.featuredImageUrl = response.url;
                // close modal automatically
                this.isImageSelectorOpen = false;
              }
            },
          });
      },
    });
  }

  onFormSubmit(): void {
    // make sure blog post model and id is valid
    if (this.blogPostModel && this.id) {
      // convert BlogPostModel fit for UpdateBlogPostModel
      var updatedBlogPost: UpdateBlogPost = {
        author: this.blogPostModel.author,
        content: this.blogPostModel.content,
        shortDescription: this.blogPostModel.shortDescription,
        featuredImageUrl: this.blogPostModel.featuredImageUrl,
        isVisible: this.blogPostModel.isVisible,
        publishedDate: this.blogPostModel.publishedDate,
        title: this.blogPostModel.title,
        urlHandle: this.blogPostModel.urlHandle,
        categories: this.selectedCategories ?? [],
      };

      this.updateBlogPostSubscription = this.blogPostService
        .updateBlogPostById(this.id, updatedBlogPost)
        .subscribe({
          next: (response) => {
            // if successful navigate to blogpost list
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService
        .deleteBlogPostById(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorOpen = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorOpen = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
