import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RolePage} from './role.page';

describe('RolePage', () => {
    let component: RolePage;
    let fixture: ComponentFixture<RolePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RolePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(RolePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
