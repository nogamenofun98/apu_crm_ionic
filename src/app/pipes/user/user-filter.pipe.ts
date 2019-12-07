import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        return value.filter(item => {
            if (item.username.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.user_full_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.user_email.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.role.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.industry.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            return item.user_id == searchText;
        });

    }

}
