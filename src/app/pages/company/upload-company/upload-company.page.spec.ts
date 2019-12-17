import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {UploadCompanyPage} from './upload-company.page';

describe('UploadCompanyPage', () => {
  let component: UploadCompanyPage;
  let fixture: ComponentFixture<UploadCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCompanyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
