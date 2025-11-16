import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectAFarmMainComponent } from './pages/select-a-farm-main/select-a-farm-main.component';
import { RegisterComponent } from './pages/register/register.component';
import path from 'path';
import { LoginComponent } from './pages/login/login.component';
import { AddFarmComponent } from './pages/add-farm/add-farm.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AskAiComponent } from './ask-ai/ask-ai.component';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { CropFormComponent } from './crop-form/crop-form.component';
import { LandFormComponent } from './land-form/land-form.component';
import { ViewLandComponent } from './view-land/view-land.component';
import { LandListComponent } from './land-list/land-list.component';
import { CropListComponent } from './crop-list/crop-list.component';
import { ViewCropComponent } from './view-crop/view-crop.component';
import {PestDiseaseComponent } from './pest-disease/pest-disease.component';
import { PestDiseaseListComponent } from './pest-disease-list/pest-disease-list.component';
import { SoilInfoComponent } from './soil-info/soil-info.component';
import { TaskActivityComponent } from './task-activity/task-activity.component';

const routes: Routes = [

    {path: 'dashboard/:id', component: DashboardComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'select-a-farm', component: SelectAFarmMainComponent},
    {path:'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'add-farm', component: AddFarmComponent},
    {path: 'update-profile', component: UpdateProfileComponent},
    {path: 'ask-ai', component: AskAiComponent},
    {path: 'weather/:id', component: WeatherDashboardComponent},
    {path: 'crop-form/:id', component:  CropFormComponent},
    {path: 'crop-form', component:  CropFormComponent},
    {path:'land-form/:id', component: LandFormComponent},
    {path:'view-land', component: ViewLandComponent},
    { path: 'view-land/:id', component: ViewLandComponent },
    {path:'land-list/:id', component: LandListComponent },
     {path:'view-crop/:id', component:ViewCropComponent },
    {path:'crop-list', component: CropListComponent  },
    {path:'pest-disease', component: PestDiseaseComponent },
    { path: 'pest-disease/:cropId', component: PestDiseaseComponent }, 
    {path:'pest-disease-list', component: PestDiseaseListComponent },
    {path:'pest-disease-list/:id', component: PestDiseaseListComponent },
    { path: 'soil-info/:id', component: SoilInfoComponent },
   { path: 'task-activity/:id', component: TaskActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
