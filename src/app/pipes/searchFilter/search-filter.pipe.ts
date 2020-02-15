import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        return value.filter(item => {
            let isFound = false;
            Object.keys(item).forEach((key, index) => {
                // console.log(item[key]);
                if (item[key] != null) {
                    if (item[key].toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                        isFound = true;
                        return true;
                    }
                }
            });
            if (isFound) {
                return true;
            }
        });

    }

}
