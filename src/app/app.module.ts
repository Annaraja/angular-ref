import { AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './list/search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { WaitingforconfirmComponent } from './list/waitingforconfirm/waitingforconfirm.component';
import { SuspenedComponent } from './list/suspened/suspened.component';
import { DelayedComponent } from './list/delayed/delayed.component';
import { ListviewComponent } from './list/listview/listview.component';
import { InvoicedetailComponent } from './invoice-detail/invoicedetail/invoicedetail.component';
import { InvoiceplanComponent } from './invoice-detail/invoiceplan/invoiceplan.component';
import { InvoicecollectComponent } from './invoice-detail/invoicecollect/invoicecollect.component';
import { InvoicelistComponent } from './invoice-detail/invoicelist/invoicelist.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IssuedComponent } from './list/issued/issued.component';
import { FilterPipe } from './list/search/filter.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TaglabelComponent } from './shared/taglabel/taglabel.component';
import { InboxlistComponent } from './shared/inboxlist/inboxlist.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { InvoiceDetailGuard } from './invoice-detail/invoicedetail.guard.service';
import { AuthInterceptors } from './services/auth-interceptors.service';
import { PopoverComponent } from './shared/popover/popover.component';
import { FacetednavigationComponent } from './shared/facetednavigation/facetednavigation.component';


const appRoutes:Routes=[
  {
      path:'',component:DashboardComponent,  canActivate:[AuthGuard],  
      children:[
        {path:'delayed',component:DelayedComponent},
        {path:'watingForConfirm',component:WaitingforconfirmComponent},
        {path:'suspened',component:SuspenedComponent},
        {path:'issued',component:IssuedComponent},
        {path:'',component:ListviewComponent}
      ]
  },
  {path:'search',component:SearchComponent,canActivate:[AuthGuard]},
  {path:'facet',component:FacetednavigationComponent,canActivate:[AuthGuard]},
  {path:'invoicedetail/:id',component:InvoicedetailComponent, canActivate:[InvoiceDetailGuard],
    children:[
      {path:'',component:InvoiceplanComponent},
      {path:'list',component:InvoicelistComponent},
      {path:'collect',component:InvoicecollectComponent}
    ]
  },
  {path:'auth',component:AuthComponent},
  {path:'**',redirectTo:'/'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    DashboardComponent,
    SearchComponent,
    WaitingforconfirmComponent,
    SuspenedComponent,
    DelayedComponent,
    ListviewComponent,
    InvoicedetailComponent,
    InvoiceplanComponent,
    InvoicecollectComponent,
    InvoicelistComponent,
    IssuedComponent,
    FilterPipe,
    SpinnerComponent,
    TaglabelComponent,
    InboxlistComponent,
    PaginationComponent,
    PlaceHolderDirective,
    AlertComponent,
    AuthComponent,
    PopoverComponent,
    FacetednavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptors,multi:true}
  ],
  bootstrap: [AppComponent],
  exports:[
RouterModule
  ],
  entryComponents:[AlertComponent]
})
export class AppModule { }
