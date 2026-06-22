import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Card } from './components/card/card';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
  {
    path: '',
    component: InicioSesion
  },

  {
    path: 'home',
    component: Home
  },

  {
    path:'admin',
    component: Admin
  },

  {
    path: 'productos/:categoria',
    component: Card
  },

  {
    path: 'carrito',
    component: Carrito
  }
];