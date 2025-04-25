import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material-share';
import { CommonModule } from '@angular/common';
import { PostModel } from '../../model/post.model';
import { PostServices } from '../../services/posts.services';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  imports: [...MATERIAL_IMPORTS, CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  // providers: [PostServices]
})
export class PostListComponent implements OnInit {
  dataSource: PostModel[] = [];
  isLoading = false;
  private postSub!: Subscription;
  totalLength = 10;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions = [1, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public postServices: PostServices) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getPostPaginator();
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPostPaginator();
  }

  onDelete(id: string) {
    this.postServices.deletePost(id)
      .subscribe(res => {
        if (!res) {
          console.log('Delete post failed');
          return;
        }

        // Optional: adjust current page if it becomes empty
        if (this.dataSource.length === 1 && this.paginator.hasPreviousPage()) {
          this.paginator.previousPage(); // UI change only
          this.pageNumber = this.paginator.pageIndex + 1; // Update internal state
        } else {
          this.paginator.firstPage(); // Move paginator to page 0
          this.pageNumber = 1;
        }
        this.getPostPaginator();
      });
  }

  getPostPaginator() {
    this.postServices.getPosts(this.pageSize, this.pageNumber).subscribe(res => {
      this.dataSource = res.posts;
      this.totalLength = res.totalCount;
      this.isLoading = false;
    });
  }
}
