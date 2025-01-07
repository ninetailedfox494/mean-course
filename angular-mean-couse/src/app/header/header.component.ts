import { Component, EventEmitter, Output } from '@angular/core';
import { MATERIAL_IMPORTS } from '../shared/material-share';

@Component({
  selector: 'app-header',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}
