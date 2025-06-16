import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { gsap } from 'gsap/all';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  constructor(public cookies: CookieService, public service: MainService, public router: Router, public cdref: ChangeDetectorRef, private el: ElementRef, private renderer: Renderer2) { }

  tl = gsap.timeline();
  ngAfterViewInit(): void {
    this.tl.fromTo(".logo", { opacity: 1, y: -150 }, { opacity: 1, y: 0, ease: "bounce", duration: 1.5, delay: 2 })

    // const googleTranslateElement = this.el.nativeElement.querySelector('#google_translate_element');

    // if (googleTranslateElement) {
    //   this.renderer.listen(googleTranslateElement, 'click', (event: Event) => {
    //     // this.service.currentLang = this.cookies.get('googtrans')
    //     // console.log(this.service.currentLang);

    //     event.preventDefault(); // Prevent the default action (e.g., navigating to a URL)

    //     // You can perform additional logic here if needed
    //   });
    // }


    // const translateElement = this.el.nativeElement.querySelector('#google_translate_element');
    // this.renderer.listen(translateElement, 'DOMSubtreeModified', (event) => {
    //   const val = event.target.innerText.trim();
    //   this.service.currentLang = val;
    //   // this.service.currentLang = this.cookies.get('googtrans')
    //   console.log(this.service.currentLang, 'this.service.currentLang');
    // });

    // this.service.arabicStylesTrigger();
//  const target = this.el.nativeElement.querySelector('#google_translate_element');

//   if (target) {
//     const observer = new MutationObserver(() => {
//       const visibleLang = target.innerText.trim();

//       if (visibleLang === 'Select Language') {
//         this.service.currentLang = 'Select Language';
//       } else {
//         const val = this.cookies.get('googtrans');
//         if (val) {
//           const parts = val.split('/');
//           const langCode = parts[2] || '';
//           this.service.currentLang = this.mapLangCodeToName(langCode);
//         }
//       }

//       this.service.arabicStylesTrigger();
//       console.log('Language Set:', this.service.currentLang);
//     });

//     observer.observe(target, {
//       childList: true,
//       subtree: true,
//       characterData: true,
//     });
//   }

this.initLanguageObserver();
  }

  initLanguageObserver(): void {
    const target = this.el.nativeElement.querySelector('#google_translate_element');

    // ✅ Set default language to English if not already set
    const currentVal = this.cookies.get('googtrans');
    if (!currentVal) {
      this.cookies.set('googtrans', '/en/en');
      this.service.currentLang = 'English';
      this.service.arabicStylesTrigger();
      console.log('Default Language Set: English');
    }

    if (target) {
      const observer = new MutationObserver(() => {
        const visibleLang = target.innerText.trim();

        if (visibleLang === 'Select Language') {
          this.service.currentLang = 'Select Language';
        } else {
          const val = this.cookies.get('googtrans');
          if (val) {
            const parts = val.split('/');
            const langCode = parts[2] || 'en';
            this.service.currentLang = this.mapLangCodeToName(langCode);
          } else {
            this.service.currentLang = 'English'; // fallback if cookie is missing
          }
        }

        this.service.arabicStylesTrigger();
        console.log('Language Set:', this.service.currentLang);
      });

      observer.observe(target, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  mapLangCodeToName(code: string): string {
    const langMap: { [key: string]: string } = {
      en: 'English',
      ar: 'Arabic',
      fr: 'French',
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu',
      ml: 'Malayalam',
      ur: 'Urdu',
      // Add more as needed
    };

    return langMap[code] || 'English'; // Default fallback
  }


//   mapLangCodeToName(code: string): string {
//   const langMap: { [key: string]: string } = {
//     en: 'English',
//     ar: 'Arabic',
//     fr: 'French',
//     hi: 'Hindi',
//     ta: 'Tamil',
//     te: 'Telugu',
//     ml: 'Malayalam',
//     ur: 'Urdu',
//     // Add more as needed
//   };

//   return langMap[code] || 'English';  // Default fallback
// }

  selected = -1
  c_selected: any[] = []

  hover(n: any) {
    this.selected = n;
  }

  show(n: any) {
    this.c_selected[n] = !this.c_selected[n];
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }
}
