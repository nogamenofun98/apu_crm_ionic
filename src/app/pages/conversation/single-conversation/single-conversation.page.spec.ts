import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleConversationPage} from './single-conversation.page';

describe('SingleConversationPage', () => {
  let component: SingleConversationPage;
  let fixture: ComponentFixture<SingleConversationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleConversationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleConversationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
