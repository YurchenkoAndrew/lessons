import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent},
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(value => value.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
