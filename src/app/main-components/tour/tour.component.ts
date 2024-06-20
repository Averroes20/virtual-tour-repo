import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.min.js')
        .then(() => this.loadScript('/assets/js/panolens.min.js'))
        .then(() => this.initializePanorama())
        .catch(err => console.error('Error loading scripts', err));
    }
  }

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(`Error loading script ${url}`);
      document.body.appendChild(script);
    });
  }

  initializePanorama(): void {
    const panorama = new (window as any).PANOLENS.ImagePanorama('/assets/images/WhatsApp Image 2024-06-20 at 13.37.53_29a6d9b8.jpg');
    const panorama2 = new (window as any).PANOLENS.ImagePanorama('/assets/images/WhatsApp Image 2024-06-20 at 13.36.33_cbe87b6b.jpg');
    const panorama3 = new (window as any).PANOLENS.ImagePanorama('/assets/images/WhatsApp Image 2024-06-20 at 13.34.30_35497f91.jpg');

    const imageContainer = document.querySelector('.virtual-tour');
    const gerbang = document.querySelector('#gerbang');
    const parkir = document.querySelector('#panel');
    const santai = document.querySelector('#taman');

    const infospot = new (window as any).PANOLENS.Infospot( 350, (window as any).PANOLENS.DataImage.Info );
          infospot.position.set( 2900.06, -150.30, 2000.14 );
          infospot.addHoverElement( parkir, 150 );

    const infospot3 = new (window as any).PANOLENS.Infospot( 350, (window as any).PANOLENS.DataImage.Info );
          infospot3.position.set( -1000.06, -150.30, -3000.14 );
          infospot3.addHoverElement( gerbang, 150 );

          panorama.add( infospot, infospot3 );

    const infospot2 = new (window as any).PANOLENS.Infospot( 350, (window as any).PANOLENS.DataImage.Info );
          infospot2.position.set( 500.06, -150.30, -3000.14 );
          infospot2.addHoverElement( santai, 150 );
          panorama2.add( infospot2 );

    const infospot4 = new (window as any).PANOLENS.Infospot( 350, (window as any).PANOLENS.DataImage.Info );
          infospot4.position.set( 4000.06, -150.30, -570.14 );
          infospot4.addHoverElement( santai, 150 );
          panorama3.add( infospot4 );


    const spotButton = [
      new (window as any).THREE.Vector3(1536.06, 16.30, 3200.14),
      new (window as any).THREE.Vector3(-4136.06, 10.30, 290.14),
      new (window as any).THREE.Vector3(3136.06, 10.30, -720.14),
      new (window as any).THREE.Vector3(436.06, 10.30, 2090.14)
    ];

    const viewer = new (window as any).PANOLENS.Viewer({
      container: imageContainer,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      controlBar: true,
    });

    panorama.link(panorama2, spotButton[0]);
    panorama2.link(panorama, spotButton[1]);
    panorama2.link(panorama3, spotButton[2]);
    panorama3.link(panorama2, spotButton[3]);

    viewer.add(panorama, panorama2, panorama3);
  }
}
