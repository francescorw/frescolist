import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'frescolist-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public spotifyService: SpotifyService) { }
}
