import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  templateUrl: './theme-switch.html',
  styleUrls: ['./theme-switch.css'],
})
export class ThemeSwitch implements OnInit {

  darkMode = false;
  constructor(
    private storage: StorageService,
    // Inyección de dependencias: le pedimos a Angular el objeto `document`
    // (el documento HTML), de forma segura para SSR.
    // DOCUMENT es el token que identifica este objeto dentro de Angular;
    // `document: Document` es el nombre y tipo de la variable donde lo recibimos.
    @Inject(DOCUMENT) private document: Document
  ) {}
  

  ngOnInit() {
    const saved = this.storage.getItem('theme'); 

    if (saved === 'dark') {
      this.darkMode = true;
      this.document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.document.body.classList.add('dark');
      this.storage.setItem('theme', 'dark');
    } else {
      this.document.body.classList.remove('dark');
      this.storage.setItem('theme', '');
    }
  }
}