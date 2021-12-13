import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSpotifyComponent } from './signin-spotify.component';

describe('SigninSpotifyComponent', () => {
  let component: SigninSpotifyComponent;
  let fixture: ComponentFixture<SigninSpotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninSpotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
