import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../shared/material-share';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ...MATERIAL_IMPORTS,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
