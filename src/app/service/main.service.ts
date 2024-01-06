import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  scroll = false

  ngOnInit(): void {
    this.scroll = false;
  }

  menu = [
    {
      "name": "Home",
      "open": false,
      "url": "/home",
    },
    {
      "name": "Services",
      "open": false,
      "url": "/services",
      "child": [
        {
          "name": "Franchise",
          "url": "/services/franchise",
        },
        {
          "name": "Catering and Party",
          "url": "services/catering_&_party",
        },
      ]
    },
    {
      "name": "About us",
      "open": false,
      "url": "/about",
      // "child": [
      //   {
      //     "name": "CC India",
      //     "url": "https://degreed.com/pathway/o84qlvqlp4/pathway",
      //   },
      //   {
      //     "name": "Join us",
      //     "url": "https://degreed.com/pathway/o84qlvqlp4/pathway",
      //   },
      // ]
    },
    {
      "name": "Menu",
      "open": false,
      "url": "/menu",
    },  
    {
      "name": "Contact us",
      "open": false,
      "url": "/contactus",
    },
    {
      "name": "Our food",
      "open": false,
      "url": "/ourfood",
      "child": [
        {
          "name": "Halal Policy",
          "url": "/ourfood/halal_policy",
        },
        {
          "name": "Nutrition Facts",
          "url": "/ourfood/nutrition_facts",
        },
      ]
    },
    {
      "name": "Help & Support",
      "open": false,
      "url": "/help",
      "child": [
        {
          "name": "FAQs",
          "url": "/help/faq",
        },
        {
          "name": "Terms & Conditions",
          "url": "/help/T&C",
        },
      ]
    },
  ]
}
