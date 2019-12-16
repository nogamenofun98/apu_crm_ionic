import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        // return value.filter(item => {
        //     if (item.industry_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
        //         return true;
        //     }
        //     if (item.industry_desc.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
        //         return true;
        //     }
        //     return item.industry_id == searchText;
        // });

    }

}
