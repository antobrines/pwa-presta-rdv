import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disponibilites',
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.scss'],
})
export class DisponibilitesComponent implements OnInit {
  days = [
    {
      name: 'Lundi',
      value: 'lundi',
    },
    {
      name: 'Mardi',
      value: 'mardi',
    },
    {
      name: 'Mercredi',
      value: 'mercredi',
    },
    {
      name: 'Jeudi',
      value: 'jeudi',
    },
    {
      name: 'Vendredi',
      value: 'vendredi',
    },
    {
      name: 'Samedi',
      value: 'samedi',
    },
    {
      name: 'Dimanche',
      value: 'dimanche',
    },
  ];
  selectedDays: string[] = ['samedi', 'lundi'];
  constructor() {}

  ngOnInit(): void {}
}
