import { Routes } from '@angular/router';
import { InquiryListPageComponent } from './components/inquiry-list-page/inquiry-list-page.component';
import { InquiryFormPageComponent } from './components/inquiry-form-page/inquiry-form-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SubmissionPageComponent } from './components/submission-page/submission-page.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MeetCounselorsPageComponent } from './components/meet-counselors-page/meet-counselors-page.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'admin/login',
        component: LoginPageComponent
    },
    {
        path: 'admin/list-of-inquiries',
        component: InquiryListPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'inquiry-form',
        component: InquiryFormPageComponent
    },
    {
        path: 'confirmation-page',
        component: ConfirmationPageComponent
    },
    {
        path: 'submission-page',
        component: SubmissionPageComponent
    },
    {
        path: 'meet-counselors-page',
        component: MeetCounselorsPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
