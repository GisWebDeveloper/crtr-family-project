import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translateService = inject(TranslateService);


  /** Возвращает имя свойства с учетом текущего языка
   * @param propertyName Имя свойства
   * @returns Имя свойства с учетом текущего языка
   * @example
   * getTranslatedPropertyName('name') // 'nameRu'
   * getTranslatedPropertyName('name') // 'nameKz'
   * getTranslatedPropertyName('name') // 'nameEn'
   * */
  getTranslatedPropertyName<T>(propertyName: string): keyof T {
    const lang = this.translateService.currentLang || localStorage.getItem('appLang') || 'kz';
    console.log(lang);

    return `${propertyName}${lang[0].toUpperCase()}${lang.slice(1)}` as keyof T;
  }

  /** Возвращает переведенное значение свойства объекта в зависимости от текущего языка
   * @param obj Объект
   * @param propName Имя свойства
   * @returns Переведенное значение свойства объекта
   * @example
   * getTranslatedProperty({ nameRu: 'Название' }, 'name') // 'Название'
   * getTranslatedProperty({ nameKz: 'Атауы' }, 'name') // 'Атауы'
   * getTranslatedProperty({ nameEn: 'Name' }, 'name') // 'Name'
   * */
  getTranslatedValue(obj: any, propName: string = 'name', defaultValue: string = ''): string {
    const prop = this.getTranslatedPropertyName(propName);
    if (typeof obj === 'string') {
      return obj;
    }
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
    return obj[prop] || obj[propName] || obj['nameRu'] || defaultValue;
  }
}
