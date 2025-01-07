import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material-share';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<any>();

  onAddPost(form: NgForm) {
    const post = {
      title: form.value.title,
      content: form.value.content
    };

    this.postCreated.emit(post);
  }

}
