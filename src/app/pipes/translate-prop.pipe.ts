import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
    name: 'translateProp',
    pure: false,
})
export class TranslatePropPipe implements PipeTransform {
    constructor(private languageService: LanguageService) {}

    transform(
        obj: any,
        propName: string = 'name',
        defaultValue: string = ''
    ): string {
        return this.languageService.getTranslatedValue(
            obj,
            propName,
            defaultValue
        );
    }
}
