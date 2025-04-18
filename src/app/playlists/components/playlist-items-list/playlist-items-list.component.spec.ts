import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistItemsListComponent } from './playlist-items-list.component';

describe('PlaylistItemsListComponent', () => {
  let component: PlaylistItemsListComponent;
  let fixture: ComponentFixture<PlaylistItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistItemsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
