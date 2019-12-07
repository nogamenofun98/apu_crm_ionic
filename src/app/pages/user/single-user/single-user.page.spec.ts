import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleUserPage} from './single-user.page';

describe('SingleUserPage', () => {
  let component: SingleUserPage;
  let fixture: ComponentFixture<SingleUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
