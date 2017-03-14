import { SkelComponent } from './skel.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('SkelComponent', () => {

  let fixture: ComponentFixture<SkelComponent>;
  let component: SkelComponent;

  beforeEach(done => {
    TestBed.configureTestingModule({
      declarations: [ SkelComponent ],
    });
    TestBed.compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SkelComponent);
        component = fixture.componentInstance;
      })
      .then(() => done());
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
