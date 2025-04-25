import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { PostServices } from '../../services/posts.services';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../model/post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, ...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  isEditMode = false;
  post: PostModel | null = null;
  isLoading = false;
  form!: FormGroup // "!" tells TS: “I’ll assign it later, trust me.”
  imgReview: string | null = '';
  private postId: string | null = '';

  constructor(public postServices: PostServices, public routes: ActivatedRoute, public router: Router) {
    this.post = null;

  }

  ngOnInit(): void {
    this.createFrom();
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

  createFrom() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  onSavePost() {
    if (this.form.invalid) { return; }

    if (this.isEditMode && this.postId) {
      this.onUpdate(this.postId);
    } else {
      this.onCreate();
    }

    this.form.reset();
    this.router.navigate(['/']);
  }

  getPostById(postId: string | null) {
    return this.postServices.getPostById(postId).subscribe((post) => {
      this.post = post;
      this.isLoading = false;
      this.updateFrom(post);
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  updateFrom(value: any) {
    this.form.setValue({
      title: value?.title,
      content: value?.content,
      image: value?.imagePath
    });
  }

  onImagePicker() {

  }

  onImagePicked(event: Event) {
    const input = (event.target as HTMLInputElement);

    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imgReview = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  onCreate() {
    this.postServices.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
      .subscribe((response) => {
        if (!response) {
          console.log('err', response)
        }
      });
  }

  onUpdate(id: any) {
    this.postServices.updatePost(id, this.form.value.title, this.form.value.content, this.form.value.image)
      .subscribe((response) => {
        if (!response) {
          console.log('err', response)
        } else {
          console.log(response);
        }
      })
  }
}
