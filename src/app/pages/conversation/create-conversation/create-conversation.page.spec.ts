import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreateConversationPage} from './create-conversation.page';

describe('CreateConversationPage', () => {
  let component: CreateConversationPage;
  let fixture: ComponentFixture<CreateConversationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateConversationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateConversationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
