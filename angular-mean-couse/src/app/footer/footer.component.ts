import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../shared/material-share';

@Component({
  selector: 'app-footer',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
