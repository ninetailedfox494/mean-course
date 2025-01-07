import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [...MATERIAL_IMPORTS, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  @Input() dataSource: PostModel[] = [];
  // posts = [
  //   {id: 0, title: 'First Post', content: 'This is the first post\'s content'},
  //   {id: 1, title: 'Second Post', content: 'This is the second post\'s content'},
  //   {id: 2, title: 'Third Post', content: 'This is the third post\'s content'},
  // ];
}
