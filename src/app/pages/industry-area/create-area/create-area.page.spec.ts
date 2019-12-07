import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreateAreaPage} from './create-area.page';

describe('CreateAreaPage', () => {
  let component: CreateAreaPage;
  let fixture: ComponentFixture<CreateAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAreaPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
