import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectAFarmMainComponent } from './pages/select-a-farm-main/select-a-farm-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddFarmComponent } from './pages/add-farm/add-farm.component';

import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AskAiComponent } from './ask-ai/ask-ai.component';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { AiInteractionComponent } from './pages/ai-interaction/ai-interaction.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SelectAFarmMainComponent,
    LoginComponent,
    RegisterComponent,
    AddFarmComponent,
    UpdateProfileComponent,
    AskAiComponent,
    WeatherDashboardComponent, AiInteractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
