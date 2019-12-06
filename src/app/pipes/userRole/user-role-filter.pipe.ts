/* tslint:disable:triple-equals */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'userRoleFilter'
})
export class UserRoleFilterPipe implements PipeTransform {

    transform(value: any, searchText: string): any {
        if (!value || !searchText) {
            return value;
        }
        return value.filter(item => {
            if (item.user_role_description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.user_role_json.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                return true;
            }
            if (item.user_role_id == searchText) {
                return true;
            }
            return false;
        });

    }

}
