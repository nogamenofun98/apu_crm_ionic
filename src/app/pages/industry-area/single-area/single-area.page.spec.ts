import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleAreaPage} from './single-area.page';

describe('SingleAreaPage', () => {
  let component: SingleAreaPage;
  let fixture: ComponentFixture<SingleAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAreaPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
