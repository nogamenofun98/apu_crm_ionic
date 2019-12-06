import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreateRolePage} from './create-role.page';

describe('CreateRolePage', () => {
    let component: CreateRolePage;
    let fixture: ComponentFixture<CreateRolePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateRolePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateRolePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
