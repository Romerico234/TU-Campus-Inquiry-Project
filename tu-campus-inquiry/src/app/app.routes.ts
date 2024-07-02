import { Routes } from '@angular/router';
import { InquiryListComponent } from './components/inquiry-list/inquiry-list.component';
import { InquiryFormComponent } from './components/inquiry-form/inquiry-form.component';
import { HomeComponent } from './components/home/home.component';
import { SubmissionPageComponent } from './components/submission-page/submission-page.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'inquiries',
        component: InquiryListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'inquiry-form',
        component: InquiryFormComponent
    },
    {
        path: 'confirmation',
        component: ConfirmationPageComponent
    },
    {
        path: 'submission',
        component: SubmissionPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
