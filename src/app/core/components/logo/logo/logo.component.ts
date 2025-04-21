import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'frescolist-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @HostBinding('attr.aria-hidden')
  ariaHidden = true;
}
