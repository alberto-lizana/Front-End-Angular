import { Component } from '@angular/core';
import { Dashboard } from '../../components/dashboard/dashboard';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Dashboard, Nav, Footer],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
