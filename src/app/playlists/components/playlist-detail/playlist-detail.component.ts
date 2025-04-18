import { Component, Input, Output, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'frescolist-playlist-detail',
  imports: [ReactiveFormsModule, MatInput, MatCardModule, MatFormFieldModule, MatButton, TextFieldModule],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent implements OnInit {
  @Input() playlistId?: string; // Input for editing an existing playlist
  title?: string;

  playlistForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private playlistsService: PlaylistsService, private router: Router) {
    this.playlistForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pre-fill the title if provided (for editing)

    if (this.playlistId) {
      this.playlistsService.getPlaylistDetails(this.playlistId).subscribe(details => {
        console.log('Playlist ID:', details.id);
        console.log('Playlist Title:', details.title);
        console.log('Playlist Content:\n', details.content);
        if (details) {
          this.playlistForm.patchValue({ title: details.title, content: details.content });
        }
      });
    }
  }

  save() {
    if (this.playlistId) {
      // Edit existing playlist
      this.playlistsService.edit({
        playlistId: this.playlistId,
        content: this.playlistForm.value.content
      }).subscribe(item => {
        console.log(`edited playlist: id=${item.id}, title=${item.title}`);
        this.router.navigate(['/playlists']);
      });
    } else {
      // Add new playlist
      this.playlistsService.add({
        title: this.playlistForm.value.title,
        content: this.playlistForm.value.content
      }).subscribe(item => {
        console.log(`created playlist: id=${item.id}, title=${item.title}`);
        this.router.navigate(['/playlists']);
      });
    }
  }
}
