import { Component, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'frescolist-toolbar',
    imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() appName: string = '';
  @Output() isMenuOpened: boolean = false;

  menuButtonClicked() : void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
