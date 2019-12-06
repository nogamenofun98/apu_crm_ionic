import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SingleRolePage} from './single-role.page';

describe('SingleRolePage', () => {
    let component: SingleRolePage;
    let fixture: ComponentFixture<SingleRolePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SingleRolePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SingleRolePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
