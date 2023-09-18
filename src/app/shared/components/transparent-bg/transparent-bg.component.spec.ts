import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentBgComponent } from './transparent-bg.component';

describe('TransparentBgComponent', () => {
  let component: TransparentBgComponent;
  let fixture: ComponentFixture<TransparentBgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransparentBgComponent]
    });
    fixture = TestBed.createComponent(TransparentBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
