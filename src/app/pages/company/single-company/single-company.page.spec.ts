import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleCompanyPage} from './single-company.page';

describe('SingleCompanyPage', () => {
  let component: SingleCompanyPage;
  let fixture: ComponentFixture<SingleCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCompanyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
