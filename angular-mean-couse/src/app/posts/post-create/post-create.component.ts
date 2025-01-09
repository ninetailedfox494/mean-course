import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { PostServices } from '../../services/posts.services';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  constructor(public postServices: PostServices) {

  }
  onAddPost(form: NgForm) {
    if (form.invalid) { return; }

    this.postServices.addPost(form.value.title, form.value.content);
    
    form.resetForm();
  }
}
