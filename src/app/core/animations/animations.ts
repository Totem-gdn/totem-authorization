import { animate, group, style, transition, trigger } from '@angular/animations';

export const Animations = {
  animations: [
    trigger(
      'showBanner',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateY(-20px)', opacity: 0 }),
            group([
              animate('0.33s ease-in-out',
                style({ transform: 'translateY(0px)' })),
              animate('0.33s ease-in-out',
                style({ opacity: 1 }))
            ])
          ]
        ),
      ]
    ),
    trigger(
      'showMessage',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            group([
              animate('0.4s ease-in-out',
                style({ height: 36 })),
              animate('0.3s 0.1s ease-in-out',
                style({ opacity: 1 }))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 36, opacity: 1 }),
            group([
              animate('0.3s 0.1s ease-in-out',
                style({ height: 0 })),
              animate('0.3s ease-in-out',
                style({ opacity: 0 }))
            ])
          ]
        )
      ]
    ),
    trigger(
      'toggleSelector',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateY(-10px)', opacity: 0 }),
            group([
              animate('0.22s ease-in-out',
                style({ transform: 'translateY(0px)' })),
              animate('0.22s ease-in-out',
                style({ opacity: 1 }))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            group([
              animate('0.22s ease-in-out',
                style({ transform: 'translateY(-10px)' })),
              animate('0.22s ease-in-out',
                style({ opacity: 0 }))
            ])
          ]
        )
      ]
    ),
    trigger(
      'swapText',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            group([
              animate('0.22s 0.33s ease-in',
                style({ height: 22 })),
              animate('0.22s 0.33s ease-in',
                style({ opacity: 1 }))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 22, opacity: 1 }),
            group([
              animate('0.22s ease-out',
                style({ height: 0 })),
              animate('0.22s ease-out',
                style({ opacity: 0 }))
            ])
          ]
        )
      ]
    ),
    trigger(
      'showGas',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            group([
              animate('0.4s ease-in-out',
                style({ height: 21 })),
              animate('0.3s 0.1s ease-in-out',
                style({ opacity: 1 }))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 21, opacity: 1 }),
            group([
              animate('0.3s 0.1s ease-in-out',
                style({ height: 0 })),
              animate('0.3s ease-in-out',
                style({ opacity: 0 }))
            ])
          ]
        )
      ]
    ),
    trigger(
      'showError',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            group([
              animate('0.4s ease-in-out',
                style({ height: 16 })),
              animate('0.3s 0.1s ease-in-out',
                style({ opacity: 1 }))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 16, opacity: 1 }),
            group([
              animate('0.3s 0.1s ease-in-out',
                style({ height: 0 })),
              animate('0.3s ease-in-out',
                style({ opacity: 0 }))
            ])
          ]
        )
      ]
    ),
    trigger(
      'showInput',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.4s ease-in-out',
              style({ height: 40, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 40, opacity: 1 }),
            animate('0.4s ease-in-out',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'buttonBlockAppear',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1, height: 48 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 48 }),
            animate('0.4s ease-in-out',
              style({ opacity: 0, height: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'tagAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1, height: 40 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 40 }),
            animate('0.4s ease-in-out',
              style({ opacity: 0, height: 40 }))
          ]
        )
      ]
    ),
    trigger(
      'hashAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1, height: 128 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 128 }),
            animate('0.4s ease-in-out',
              style({ opacity: 0, height: 128 }))
          ]
        )
      ]
    ),
    trigger(
      'hashAnimationMobile',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1, height: 139 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 139 }),
            animate('0.4s ease-in-out',
              style({ opacity: 0, height: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'fileAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1, height: 50 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, height: 50 }),
            animate('0.4s ease-in-out',
              style({ opacity: 0, height: 0 }))
          ]
        )
      ]
    ),
    // trigger(
    //   'fade-in-out',
    //   [
    //     transition(
    //       ':enter',
    //       [
    //         style({ opacity: 0 }),
    //         animate('0.3s ease-in-out',
    //           style({ opacity: 1 }))
    //       ]
    //     ),
    //     transition(
    //       ':leave',
    //       [
    //         style({ opacity: 1 }),
    //         animate('0.3s ease-in-out',
    //           style({ opacity: 0 }))
    //       ]
    //     )
    //   ]
    // ),
    trigger(
      'fade-in-out',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, position: "{{position}}" }),
            animate("{{duration}} {{delay}} ease-in-out",
              style({ opacity: "{{in}}", position: "{{position}}" }))
          ], { params: { in: 1, out: 0, position: '', duration: '0.3s', delay: '0s' } }
        ),
        transition(
          ':leave',
          [
            style({ opacity: "{{in}}", position: "{{position}}" }),
            animate("{{duration}} {{delay}} ease-in-out",
            style({ opacity: 0, position: "{{position}}" }))
          ], { params: { in: 1, out: 0, position: '', duration: '0.3s', delay: '0s' } }
        )
      ]
    ),
    trigger(
      'fade-in',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.4s ease-in-out',
              style({ opacity: 1 }))
          ]
        ),
      ]
    ),
    trigger(
      'enter-delay',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.4s 1s ease-in-out'),
            style({ opacity: 0 })
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 0 }),
            animate('0.4s 1s ease-in-out'),
            style({ opacity: 0 })
          ]
        ),
      ]
    ),
    trigger(
      'stopLoader',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.33s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.33s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]

}
