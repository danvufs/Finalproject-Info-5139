import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkmodeComponent } from './darkmode.component';

describe('DarkmodeComponent', () => {
  let component: DarkmodeComponent;
  let fixture: ComponentFixture<DarkmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DarkmodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Check the initial value of the mode variable (~ background color)
  it('should have initial colour for font and background', () => {
    expect(document.body.classList.contains('lightmode')).toBe(false);
  })
  // Check if the colour changes when the toggleMode function is called
  it('should change the colour for font and background when the button is pressed', () => {
    component.toggleMode();
    component.setMode(true);
    expect(document.body.classList.contains('darkmode')).toBe(true);
  })
});