import { Component, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section #section class="section" id="push" (click)="navigateTo('push')">
      <div class="overlay">
        <h1>PUSH</h1>
        <p>Precvičuj prsia, ramená a tricepsy.</p>
      </div>
    </section>

    <section #section class="section" id="pull" (click)="navigateTo('pull')">
      <div class="overlay">
        <h1>PULL</h1>
        <p>Zaťažuj chrbát, biceps a zadné ramená.</p>
      </div>
    </section>

    <section #section class="section" id="legs" (click)="navigateTo('legs')">
      <div class="overlay">
        <h1>LEGS</h1>
        <p>Buduj silné nohy – kvadricepsy, hamstringy, lýtka.</p>
      </div>
    </section>

  `,
  styles: [`
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      scroll-behavior: smooth;
      font-family: Arial, sans-serif;
      background: #000;
    }

    :host {
      display: block;
      height: 100%;
    }

    .section {
      height: 100vh;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      scroll-snap-align: start;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      cursor: pointer; /* klikateľné */
    }

    #push {
      background-image: linear-gradient(rgba(255,120,0,0.45), rgba(255,120,0,0.45)),
      url('https://barbend.com/wp-content/uploads/2022/09/Chris-Bumstead-1.png');
    }
    #pull {
      background-image: linear-gradient(rgba(255,100,0,0.45), rgba(255,100,0,0.45)),
      url('https://usgymfluencers-1eff6.kxcdn.com/wp-content/uploads/sites/3/2022/11/FQhaL_RX0AM4brR-1024x576.jpg');
    }
    #legs {
      background-image: linear-gradient(rgba(255,80,0,0.45), rgba(255,80,0,0.45)),
      url('https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/03/ronnie-coleman-squat-11090.jpg?quality=86&strip=all');
    }

    .overlay {
      text-align: center;
      color: rgba(255,255,255,0.85);
      padding: 2rem;
      backdrop-filter: blur(4px);
    }

    .overlay h1 {
      font-size: 18vw;
      font-weight: 900;
      margin: 0;
      opacity: 0;
      transform: translateY(100px);
      transition:
        opacity 1.2s ease,
        transform 1.2s ease,
        letter-spacing 1.2s ease;
      letter-spacing: -15px;
    }

    .overlay p {
      font-size: 1.5rem;
      margin-top: 1rem;
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 1.2s ease, transform 1.2s ease;
    }

    .visible .overlay h1,
    .visible .overlay p {
      opacity: 1;
      transform: translateY(0);
      letter-spacing: 8px;
    }

    .overlay h1.transition-out {
      opacity: 0;
      transform: translateY(-120px);
      transition: opacity 0.9s ease, transform 0.9s ease;
    }
  `]
})
export class DashboardComponent implements AfterViewInit {
  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const h1 = entry.target.querySelector("h1");
        const p = entry.target.querySelector("p");
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          h1?.classList.remove("transition-out");
          p?.classList.remove("transition-out");
        } else {
          h1?.classList.add("transition-out");
          p?.classList.add("transition-out");
        }
      });
    }, { threshold: 0.55 });

    this.sections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }

  navigateTo(type: string) {
    this.router.navigate(['/exercises', type]);
  }
}
