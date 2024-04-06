import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-out', style({ transform: 'translateX(-100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export const fadeInOutAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('0.5s ease', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);

export const scaleAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 0, transform: 'scale(0.5)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);

export const rotateAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'rotate(-90deg)' }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 1, transform: 'rotate(0deg)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'rotate(0deg)' }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 0, transform: 'rotate(90deg)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
