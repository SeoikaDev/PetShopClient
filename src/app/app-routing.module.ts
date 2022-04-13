import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductDetailComponent } from './pages/admin/admin-product-detail/admin-product-detail.component';
import { IndexComponent } from './pages/admin/index/index.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { ServiceAdminDetailComponent } from './pages/admin/service-admin-detail/service-admin-detail.component';
import { ServiceAdminComponent } from './pages/admin/service-admin/service-admin.component';
import { UserDetailComponent } from './pages/admin/user-detail/user-detail.component';
import { UserComponent } from './pages/admin/user/user.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { FavoriteComponent } from './pages/user/favorite/favorite.component';
import { HistoryComponent } from './pages/user/history/history.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ServiceComponent } from './pages/user/service/service.component';
import { ShoppingcartComponent } from './pages/user/shoppingcart/shoppingcart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', component : LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'shoppingcart', component: ShoppingcartComponent },
  { path: 'admin/home', component: IndexComponent },
  { path: 'admin/product', component: ProductComponent },
  { path: 'admin/product-detail/:id', component: AdminProductDetailComponent },
  { path: 'admin/service', component: ServiceAdminComponent },
  { path: 'admin/service-detail/:id', component: ServiceAdminDetailComponent },
  { path: 'admin/user', component: UserComponent },
  { path: 'admin/user-detail/:email', component: UserDetailComponent },
  { path: 'admin/order', component: OrderComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
