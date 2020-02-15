import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleEmployeePage} from './single-employee.page';

describe('SingleEmployeePage', () => {
  let component: SingleEmployeePage;
  let fixture: ComponentFixture<SingleEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleEmployeePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
