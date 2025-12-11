import {
  trigger,
  transition,
  style,
  query,
  animate
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 })
    ], { optional: true }),

    query(':leave', [
      style({ position: 'absolute', width: '100%' }),
      animate('500ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ], { optional: true }),

    query(':enter', [
      style({ position: 'absolute', width: '100%' }),
      animate('500ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { optional: true })
  ])
]);
