import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false,
})
export class AddPage {

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  selectedMode: string = 'POST';

  selectedImage: string =
    'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800';


  constructor(
    private router: Router
  ) {}


  /* =====================================
     CLOSE
  ===================================== */

  closePage() {

    this.router.navigate(['/home']);

  }


  /* =====================================
     NEXT
  ===================================== */

  nextStep() {

    console.log('Selected mode:', this.selectedMode);

    console.log('Selected image:', this.selectedImage);

  }


  /* =====================================
     SELECT MODE
  ===================================== */

  selectMode(mode: string) {

    this.selectedMode = mode;

  }


  /* =====================================
     PREVIEW
  ===================================== */

  togglePreview() {

    console.log('Preview button clicked');

  }


  /* =====================================
     CAMERA
  ===================================== */

  openCamera() {

    console.log('Camera button clicked');

    this.fileInput.nativeElement.click();

  }


  /* =====================================
     GALLERY
  ===================================== */

  openGallery() {

    this.fileInput.nativeElement.click();

  }


  /* =====================================
     IMAGE SELECTED FROM DEVICE
  ===================================== */

  onImageSelected(event: Event) {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      const file = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {

        this.selectedImage =
          reader.result as string;

      };

      reader.readAsDataURL(file);

    }

  }


  /* =====================================
     SELECT GALLERY IMAGE
  ===================================== */

  selectGalleryImage(imageUrl: string) {

    this.selectedImage = imageUrl;

  }


  /* =====================================
     BOTTOM NAVIGATION
  ===================================== */

  openPage(page: string) {

    switch (page) {

      case 'home':

        this.router.navigate(['/home']);

        break;


      case 'search':

        this.router.navigate(['/search']);

        break;


      case 'notifications':

        this.router.navigate(['/notifications']);

        break;


      case 'profile':

        this.router.navigate(['/profile']);

        break;

    }

  }

}
