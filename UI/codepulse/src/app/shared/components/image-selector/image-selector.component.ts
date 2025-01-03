import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  private file?: File | null;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    // get the file
    const element = event?.currentTarget as HTMLInputElement;
    this.file = element.files?.item(0);
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload image
      this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe((response) => {
          // when upload successful, rest all the form element
          this.imageUploadForm?.resetForm();
          // refresh the images after upload new image succeed
          this.getImages();
        });
    }
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}
