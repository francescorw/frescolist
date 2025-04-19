import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'frescolist-side-nav',
  imports: [MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, RouterOutlet],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
}
