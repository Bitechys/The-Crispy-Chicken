import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { gsap } from 'gsap/all';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements   AfterViewInit {

  constructor(public service:MainService,public router:Router, public cdref: ChangeDetectorRef, private el: ElementRef,  private renderer: Renderer2) { }

  tl = gsap.timeline();
  ngAfterViewInit(): void {
    this.tl.fromTo(".logo", { opacity: 1, y: -150 }, { opacity: 1, y: 0, ease:"bounce",duration: 1.5, delay:2})

    const googleTranslateElement = this.el.nativeElement.querySelector('#google_translate_element');

    if (googleTranslateElement) {
      this.renderer.listen(googleTranslateElement, 'click', (event: Event) => {
        event.preventDefault(); // Prevent the default action (e.g., navigating to a URL)

        // You can perform additional logic here if needed
      });
    }
  }

  selected = -1
  c_selected :any []= []

  hover(n:any){
    this.selected = n;
  }

  show(n:any){
    this.c_selected[n] = !this.c_selected[n];
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }
}