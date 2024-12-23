import { Component } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent {
  private file?: File | null;
  fileName: string = '';
  title: string = '';

  constructor(private imageService: ImageService) {}

  onFileUploadChange(event: Event): void {
    // get the file
    const element = event?.currentTarget as HTMLInputElement;
    this.file = element.files?.item(0);
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload image
      this.imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
