import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authenticantion.guard';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { environment } from 'src/environments/environment';
import { ShoppingcartComponent } from './pages/user/shoppingcart/shoppingcart.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ServiceComponent } from './pages/user/service/service.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IndexComponent } from './pages/admin/index/index.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { UserComponent } from './pages/admin/user/user.component';
import { ServiceAdminComponent } from './pages/admin/service-admin/service-admin.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { FavoriteComponent } from './pages/user/favorite/favorite.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { HistoryComponent } from './pages/user/history/history.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ServiceAdminDetailComponent } from './pages/admin/service-admin-detail/service-admin-detail.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingcartComponent,
    ServiceComponent,
    IndexComponent,
    ProductComponent,
    UserComponent,
    ServiceAdminComponent,
    OrderComponent,
    FavoriteComponent,
    ChangePasswordComponent,
    HistoryComponent,
    ProductDetailComponent,
    ServiceAdminDetailComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzSelectModule,
    NzCheckboxModule,
    NzCardModule,
    NzMessageModule,
    NzPaginationModule,
    NzTableModule,
    NzDividerModule,
    NzBadgeModule,
    NzInputNumberModule,
    NzModalModule,
    NzDescriptionsModule,
    NzTabsModule,
  ],
  providers: [AuthenticationGuard,
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
