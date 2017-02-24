import { SkelComponent } from './skel.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('SkelComponent', () => {

  let fixture: ComponentFixture<SkelComponent>;
  let component: SkelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SkelComponent ],
    });

    fixture = TestBed.createComponent(SkelComponent);
    component = fixture.componentInstance;
  });

  it('expect to be trutly', () => {
    expect(true).toBeTruthy();
  });

  it('expect to title change', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(element.textContent).toContain(component.title);
  });
});
