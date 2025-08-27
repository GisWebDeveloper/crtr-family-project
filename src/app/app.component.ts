import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import * as Notiflix from 'notiflix';
import {DataService} from "./services/data.service";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'body',
    template: '<router-outlet></router-outlet>' +
        '<notifier-container></notifier-container>',
})
export class AppComponent implements OnInit {

    title = 'Цифровая карта семьи';

    constructor(
        private dataService: DataService,
        private iconSetService: IconSetService,
        private router: Router,
        private titleService: Title,
        private translateService: TranslateService) {

        // iconSet singleton
        iconSetService.icons = {...iconSubset};

        this.initLanguage();
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
        });

        Notiflix.Notify.init({
            position: 'right-bottom',
            clickToClose: true,
            useIcon: false,
            timeout: 3000
        });
    }

    initLanguage() {
        this.translateService.setDefaultLang('kz');
        this.translateService.addLangs(['en', 'kz', 'ru']);
        this.translateService.use(this.dataService.getClientLanguage());

        /*
        this.translateService.get('title').subscribe(value => {
            this.title = value;
        });*/
        this.titleService.setTitle(this.title);
    }
}
