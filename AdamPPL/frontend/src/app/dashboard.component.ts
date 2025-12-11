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
        <p>Chest, shoulders and triceps... Early Christmas</p>
      </div>
    </section>

    <section #section class="section" id="pull" (click)="navigateTo('pull')">
      <div class="overlay">
        <h1>PULL</h1>
        <p>Back & biceps, legendary workout is ahead of you</p>
      </div>
    </section>

    <section #section class="section" id="legs" (click)="navigateTo('legs')">
      <div class="overlay">
        <h1>LEGS</h1>
        <p>Feared by many, enjoyed by legends</p>
      </div>
    </section>

    <section #section class="section" id="rest1" (click)="navigateTo('rest1')">
      <div class="overlay">
        <h1>REST</h1>
        <p>Do not skip this day</p>
      </div>
    </section>

    <section #section class="section" id="upper" (click)="navigateTo('upper')">
      <div class="overlay">
        <h1>UPPER</h1>
        <p>This and a white monster</p>
      </div>
    </section>

    <section #section class="section" id="lower" (click)="navigateTo('lower')">
      <div class="overlay">
        <h1>LOWER</h1>
        <p>Demolish them again</p>
      </div>
    </section>

    <section #section class="section" id="rest2" (click)="navigateTo('rest2')">
      <div class="overlay">
        <h1>REST</h1>
        <p>Rest well and repeat this split tomorrow</p>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    .section {
      height: 100vh;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      scroll-snap-align: start;
      background-size: cover;
      background-position: center;
      cursor: pointer;
    }

    .overlay {
      text-align: center;
      color: rgba(255,255,255,0.85);
      padding: 9rem;
      backdrop-filter: blur(5px);
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
      margin-top: 10rem;
      opacity: 0;
      transform: translateY(100px);
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

    /* konkrétne pozadia */
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
    #rest1 {
      background-image: linear-gradient(rgba(255,80,0,0.45), rgba(255,80,0,0.45)),
      url('https://i.prcdn.co/img?regionKey=w0ikezPAcCzqbXkA7ZjfEg%3D%3D');
    }
    #upper {
      background-image: linear-gradient(rgba(255,80,0,0.45), rgba(255,80,0,0.45)),
      url('https://wallpapers.com/images/featured/chris-bumstead-1lnwxxn436advkdz.jpg');
    }
    #lower {
      background-image: linear-gradient(rgba(255,80,0,0.45), rgba(255,80,0,0.45)),
      url('https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/02/ronnie-coleman-squat-barbell-1109.jpg?quality=86&strip=all');
    }
    #rest2 {
      background-image: linear-gradient(rgba(255,80,0,0.45), rgba(255,80,0,0.45)),
      url('https://i.prcdn.co/img?regionKey=w0ikezPAcCzqbXkA7ZjfEg%3D%3D');
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
