import { Component, Input } from '@angular/core';
import { MatListItem, MatListItemAvatar, MatListItemTitle } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'frescolist-playlist-item',
  imports: [MatListItem, MatListItemAvatar, MatListItemTitle, MatRippleModule],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.scss'
})
export class PlaylistItemComponent {
  @Input() title = '';
  @Input() iconSrc?: string = '';
}
