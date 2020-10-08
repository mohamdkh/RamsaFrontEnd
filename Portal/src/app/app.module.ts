import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConsommationComponent } from './Consommation/consommation/consommation.component';
import { UploadDataComponent } from './Consommation/upload-data/upload-data.component';
import { AddSecteurComComponent } from './Consommation/SecteurCommercial/add-secteur-com/add-secteur-com.component';
import { ListSecteurComComponent } from './Consommation/SecteurCommercial/list-secteur-com/list-secteur-com.component';
import { ListSecteurHydroComponent } from './Consommation/SecteurHydraulique/list-secteur-hydro/list-secteur-hydro.component';
import { AddSecteurHydroComponent } from './Consommation/SecteurHydraulique/add-secteur-hydro/add-secteur-hydro.component';
import { LoginComponent } from './login/login.component';
import { StatistiqueComponent } from './Consommation/statistique/statistique.component';
import { ConsomSecteurComponent } from './StatisticElements/consom-secteur/consom-secteur.component';
import { ConsomEtageComponent } from './StatisticElements/consom-etage/consom-etage.component';
import { ConsomAnneeComponent } from './StatisticElements/consom-annee/consom-annee.component';
import { ConsommateursComponent } from './StatisticElements/consommateurs/consommateurs.component';
import { RendementSecteurComponent } from './StatisticElements/rendement-secteur/rendement-secteur.component';
import { ConfigurationComponent } from './Consommation/configuration/configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConsommationComponent,
    UploadDataComponent,
    AddSecteurComComponent,
    ListSecteurComComponent,
    ListSecteurHydroComponent,
    AddSecteurHydroComponent,
    LoginComponent,
    StatistiqueComponent,
    ConsomSecteurComponent,
    ConsomEtageComponent,
    ConsomAnneeComponent,
    ConsommateursComponent,
    RendementSecteurComponent,
    ConfigurationComponent,
  ],
  imports: [
    RouterModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
