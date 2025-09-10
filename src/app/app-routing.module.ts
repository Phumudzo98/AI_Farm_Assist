import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectAFarmMainComponent } from './pages/select-a-farm-main/select-a-farm-main.component';
import { RegisterComponent } from './pages/register/register.component';
import path from 'path';
import { LoginComponent } from './pages/login/login.component';
import { AddFarmComponent } from './pages/add-farm/add-farm.component';
import { UpdateUserProfileComponent } from './pages/update-user-profile/update-user-profile.component';
import { AiInteractionComponent } from './pages/ai-interaction/ai-interaction.component';

const routes: Routes = [

  {path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'select-a-farm', component: SelectAFarmMainComponent},
  {path:'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-farm', component: AddFarmComponent},
  {path: 'update-user-profile', component: UpdateUserProfileComponent},
  {path: 'ai-interaction', component: AiInteractionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
