import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
const routes: Routes = [
  { path: 'admin/categories', component: CategoryListComponent },
  { path: 'admin/categories/add', component: AddCategoryComponent },
  { path: 'admin/categories/:id', component: EditCategoryComponent },
  { path: 'admin/blogposts', component: BlogpostListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
