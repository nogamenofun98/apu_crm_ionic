import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IndustryAreaPage} from './industry-area.page';

describe('IndustryAreaPage', () => {
    let component: IndustryAreaPage;
    let fixture: ComponentFixture<IndustryAreaPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndustryAreaPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(IndustryAreaPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
