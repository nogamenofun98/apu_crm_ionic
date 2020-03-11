import {Component, Input, OnInit} from '@angular/core';
import {HttpRequestService} from '../../../services/http-request.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-search-modal',
    templateUrl: './search-modal.page.html',
    styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
    items: any;
    searchString: string;
    @Input() type: string;
    noRecord: boolean;

    constructor(private modalController: ModalController,
                private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
        this.httpRequestService.read(this.type).then(data => {
            this.items = data.data_response;
            (this.items.length === 0) ? this.noRecord = true : this.noRecord = false;
            for (const item of this.items) {
                let industry = null;
                if (this.type === 'employees') {
                    industry = item.employee_industry;
                } else if (this.type === 'companies') {
                    industry = item.company_industry;
                }
                if (industry !== null) {
                    this.httpRequestService.read('industry-areas/' + encodeURIComponent(industry)).then(area => {
                        item.industry = area.data_response.industry_name;
                    }).catch(err => console.error(err))
                    ;
                } else {
                    item.industry = '';
                }
            }
        }).catch(err => console.error(err));
    }

    dismissModal() {
        this.modalController.dismiss();
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    select(item: any) {
        this.modalController.dismiss(item);
    }
}
