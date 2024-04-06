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

export const fadeDownAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0.7,
          transform: 'translateY(0px)',
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        animate(
          '300ms ease-out',
          style({ opacity: 0.99, transform: 'translateY(0px)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
