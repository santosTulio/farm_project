import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component';
import { FarmDetailComponent } from './farm/farm-detail/farm-detail.component';
import { FarmCreateComponent } from './farm/farm-create/farm-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasemapComponent } from './basemap/basemap.component';
import { FarmEditComponent } from './farm/farm-edit/farm-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'details/:id', component: FarmDetailComponent },
  { path: 'edit/:id', component: FarmEditComponent },
  { path: 'create', component: FarmCreateComponent },
  { path: 'draw', component: BasemapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
