import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGaurd } from './_gaurd/auth.gaurd';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGaurd],
        children: [
            { path: 'members', component: MemberListComponent},
            { path: 'list', component: ListsComponent},
            { path: 'messages', component: MessagesComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
