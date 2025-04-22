import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { PostServices } from '../../services/posts.services';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../model/post.model';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  public isEditMode = false;
  private postId: string | null = '';
  public post: PostModel | null = null;
  public isLoading = false;
  
  constructor(public postServices: PostServices, public routes : ActivatedRoute, public router: Router) {
    this.post = null;

  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(params => {
      if (params.has('postId')) {
        this.isEditMode = true;
        this.postId = params.get('postId');
        this.isLoading = true;
        this.getPostById(this.postId);
      } else {
        this.isEditMode = false;
        this.postId = '';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) { return; }

    if (this.isEditMode && this.postId) { 
      this.postServices.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.postServices.addPost(form.value.title, form.value.content);
    }

    form.resetForm();
    this.router.navigate(['/']);
  }

  getPostById(postId: string | null) {
    return this.postServices.getPostById(postId).subscribe((post) => {
      this.post = post;
      this.isLoading = false;
    });
  }

  onCancel(){
    this.router.navigate(['/']);
  }
}
