import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'industryAreaFilter'
})
export class IndustryAreaFilterPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return null;
    }

}
