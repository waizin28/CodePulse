import { UpdateBlogPost } from './../models/update-blog-post.model';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts`,
      data
    );
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Retrieves all blog posts from the API.
   *
   * @returns An observable that emits an array of BlogPost objects.
   */

  /******  f5bcf732-2116-4a94-abf0-16846d7c709a  *******/
  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`
    );
  }

  updateBlogPostById(id: string, updatedBlogPost: UpdateBlogPost) {
    return this.http.put<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`,
      updatedBlogPost
    );
  }

  deleteBlogPostById(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`
    );
  }
}
