import { Routes } from '@angular/router';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { guestGuard } from './guards/guest-guard';
import { Menu } from './pages/menu/menu';
import { CarritoPage } from './pages/carrito-page/carrito';

export const routes: Routes = [
  {
    path: '',
    component: InicioSesion,
    canActivate: [guestGuard]
  },

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'productos/:categoria',
    component: Menu,
    canActivate: [authGuard]
  },

  {
    path: 'carrito',
    component: CarritoPage,
    canActivate: [authGuard]
  }
];