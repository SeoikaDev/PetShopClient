import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/admin/index/index.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { ServiceAdminComponent } from './pages/admin/service-admin/service-admin.component';
import { UserComponent } from './pages/admin/user/user.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ServiceComponent } from './pages/user/service/service.component';
import { ShoppingcartComponent } from './pages/user/shoppingcart/shoppingcart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', component : LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'shoppingcart', component: ShoppingcartComponent },
  { path: 'admin/home', component: IndexComponent },
  { path: 'admin/product', component: ProductComponent },
  { path: 'admin/service', component: ServiceAdminComponent },
  { path: 'admin/user', component: UserComponent },
  { path: 'admin/order', component: OrderComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
