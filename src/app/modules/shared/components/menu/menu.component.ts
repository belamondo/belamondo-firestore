import { Component, Input, OnInit, Output, EventEmitter, trigger, transition, style, animate, state } from '@angular/core';

@Component({
  selector: 'belamondo-menu',
  animations: [
    trigger(
      'firstAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    ),
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    ),
    trigger(
      'buttonAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    )
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuToggle: boolean;

  constructor() { }

  ngOnInit() {
    this.menuToggle = false;
  }

  onClickMenuIcon = () => {
    this.menuToggle = !this.menuToggle;
  }
}
