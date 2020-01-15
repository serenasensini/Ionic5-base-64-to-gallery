import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  foto: any;

  constructor(private camera: Camera, private base64ToGallery: Base64ToGallery) {}

  scattaFoto(): void {

    const options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 150,
      targetHeight: 150,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      this.foto = 'data:image/jpeg;base64,' + imagePath;
      this.base64ToGallery.base64ToGallery(this.foto).then(
          res => console.log('Immagine salvata nella galleria ', res),
          err => console.log('Errore durante il salvataggio dell\'immagine.', err)
      );
    }, (err) => {
      console.log('Errore durante il caricamento dell\'immagine.');
    });
  }

}
