import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonTimelineComponent} from "./person-timeline/person-timeline.component";
import {PersonSearchComponent} from "./person-search/person-search.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'timeline/:iin',
                component: PersonTimelineComponent
            }, {
                path: 'search',
                component: PersonSearchComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule {
}
