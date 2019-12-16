import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreateCompanyPage} from './create-company.page';

describe('CreateCompanyPage', () => {
  let component: CreateCompanyPage;
  let fixture: ComponentFixture<CreateCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
