import { Component, OnDestroy, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { CommonModule } from '@angular/common';
import { PostModel } from '../../model/post.model';
import { PostServices } from '../../services/posts.services';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [...MATERIAL_IMPORTS, CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  // providers: [PostServices]
})
export class PostListComponent implements OnInit, OnDestroy {
  dataSource: PostModel[] = [];
  isLoading = false;
  private postSub!: Subscription;


  constructor(public postServices: PostServices) {

  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
  ngOnInit(): void {
    this.postServices.getPosts();
    this.isLoading = true;
    
    this.postSub = this.postServices.getPostUpdateListener().subscribe((posts: PostModel[]) => {
      this.dataSource = posts;
      this.isLoading = false;
    });
  }
  // posts = [
  //   {id: 0, title: 'First Post', content: 'This is the first post\'s content'},
  //   {id: 1, title: 'Second Post', content: 'This is the second post\'s content'},
  //   {id: 2, title: 'Third Post', content: 'This is the third post\'s content'},
  // ];

  onEdit(){

  }

  onDelete(id: string){
    this.postServices.deletePost(id);
  }
}
