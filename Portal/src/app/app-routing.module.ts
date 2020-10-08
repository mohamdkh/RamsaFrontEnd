import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ListSecteurHydroComponent } from './Consommation/SecteurHydraulique/list-secteur-hydro/list-secteur-hydro.component';
import { AddSecteurHydroComponent } from './Consommation/SecteurHydraulique/add-secteur-hydro/add-secteur-hydro.component';
import { ListSecteurComComponent } from './Consommation/SecteurCommercial/list-secteur-com/list-secteur-com.component';
import { UploadDataComponent } from './Consommation/upload-data/upload-data.component';
import { AddSecteurComComponent } from './Consommation/SecteurCommercial/add-secteur-com/add-secteur-com.component';
import { ConsommationComponent } from './Consommation/consommation/consommation.component';
import { StatistiqueComponent } from './Consommation/statistique/statistique.component';
import { ConfigurationComponent } from './Consommation/configuration/configuration.component';
const routes: Routes = [
   {path: 'Login', component: LoginComponent},
   {path: 'SecteurHydraulique', component: ListSecteurHydroComponent},
   {path: 'AjouterSecteurHydraulique',component:AddSecteurHydroComponent},
   {path: 'SecteurCommercial',component:ListSecteurComComponent},
   {path: 'UploadData',component:UploadDataComponent},
   {path: 'AjouterSecteurCommercial',component:AddSecteurComComponent},
   {path: 'Consommation',component:ConsommationComponent},
   {path: 'Statistiques',component:StatistiqueComponent},
   {path: 'Configuration',component:ConfigurationComponent},
   { path: '', redirectTo: '/Login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
