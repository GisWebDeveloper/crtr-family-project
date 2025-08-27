import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { NavItem, navItems } from '../../containers/default-layout/_nav';

export interface BreadcrumbItem {
  label: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null)
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.router.url);
      });
  }

  private buildBreadcrumbs(url: string): BreadcrumbItem[] {
    // если мы прямо на /stat/main → вернуть только один пункт
    if (url === '/stat/main') {
      return [
        {
          label: 'Главная',
          url: '/stat/main',
          active: true,
        },
      ];
    }

    const crumbs: BreadcrumbItem[] = [
      {
        label: 'Главная',
        url: '/stat/main',
        active: false,
      },
    ];

    const segments = url.split('/').filter(Boolean);
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += '/' + segment;

      const item = this.findNavItem(currentPath, navItems);
      if (item) {
        crumbs.push({
          label: item.name||'Не найдено',
          url: currentPath,
          active: index === segments.length - 1,
        });
      }
    });

    return crumbs;
  }


  private findNavItem(path: string, items: NavItem[]): NavItem | null {
    for (const item of items) {
      if (item.url === path) {
        return item;
      }
      if (item.children?.length) {
        const child = this.findNavItem(path, item.children);
        if (child) return child;
      }
    }
    return null;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
