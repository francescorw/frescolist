import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsToolbarComponent } from './playlists-toolbar.component';

describe('PlaylistsToolbarComponent', () => {
  let component: PlaylistsToolbarComponent;
  let fixture: ComponentFixture<PlaylistsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
