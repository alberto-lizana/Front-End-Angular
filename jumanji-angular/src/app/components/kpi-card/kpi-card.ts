import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  standalone: true,
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCard {
  titulo = input.required<string>();
  valor = input.required<number | string>();
}
