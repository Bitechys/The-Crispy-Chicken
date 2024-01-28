import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { gsap } from 'gsap/all';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements   AfterViewInit {

  constructor(public service:MainService,public router:Router) { }

  tl = gsap.timeline();
  ngAfterViewInit(): void {
    this.tl.fromTo(".logo", { opacity: 1, y: -150 }, { opacity: 1, y: 0, ease:"bounce",duration: 1.5, delay:2})
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
