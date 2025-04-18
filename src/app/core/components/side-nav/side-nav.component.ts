import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'frescolist-side-nav',
  imports: [MatIcon, RouterLink, RouterOutlet, MatNavList, MatListItem, MatSidenav, MatSidenavContainer, MatSidenavContent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input() isOpened: boolean | null = null;
  @Output() isOpenedChange = new EventEmitter<boolean>();

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Close the sidenav on navigation
    this.router.events.subscribe(() => {
      this.closeSidnav();
    });
  }

  closeSidnav(): void {
    if (this.isOpened) {
      this.isOpened = false;
      this.isOpenedChange.emit(this.isOpened);
    }
  }

  onSideNavClosed(): void {
    this.isOpened = false;
    this.isOpenedChange.emit(this.isOpened);
  }
}
