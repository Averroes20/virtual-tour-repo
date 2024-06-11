import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    const panorama = new (window as any).PANOLENS.ImagePanorama('/assets/images/panel1.jpeg');
    const panorama2 = new (window as any).PANOLENS.ImagePanorama('/assets/images/pano5.jpg');

    const imageContainer = document.querySelector('.image-container');

    const spotButton = [
      new (window as any).THREE.Vector3(-2136.06, 16.30, 890.14),
      new (window as any).THREE.Vector3(-2136.06, 296.30, -4290.14)
    ];

    const viewer = new (window as any).PANOLENS.Viewer({
      container: imageContainer,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      controlBar: true,
    });

    panorama.link(panorama2, spotButton[0]);
    panorama2.link(panorama, spotButton[1]);

    viewer.add(panorama, panorama2);
  }
}
