import { Component } from '@angular/core';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { MATERIAL_IMPORTS } from './shared/material-share';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { PostModel } from './model/post.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...MATERIAL_IMPORTS, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-mean-couse';
  isSidebarOpen = false;
  storePost: PostModel[] = [];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onPostAdded(event: any) {
    this.storePost.push(event);
  }

}
