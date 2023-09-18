import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  public slidesStore = [
    {
      id: '1',
      src: '../../../../assets/welcome_one.png',
      text: 'Organize o seu dia com o Tudu',
    },
    {
      id: '2',
      src: '../../../../assets/welcome_two.png',
      text: 'Organize o seu dia com o Tudu',
    },
  ];
}
