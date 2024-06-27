import { Routes , provideRouter} from '@angular/router';
import {FirstpageComponent} from './firstpage/firstpage.component';
import {SecondpageComponent} from './secondpage/secondpage.component';


export const routes: Routes = [
  { path: 'Firstpage', component: FirstpageComponent }
  // { path: '', redirectTo: 'Firstpage', pathMatch: 'full' },
  // { path: '**', redirectTo: 'Firstpage' }
];

export const routerProviders = [
  provideRouter(routes)
];
//  { path: 'Firstpage', component: FirstpageComponent },
