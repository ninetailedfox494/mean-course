import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

export const routes: Routes = [
    { path: '', component: PostListComponent }, // Default route
    { path: 'create', component: PostCreateComponent },
    { path: 'edit/:postId', component: PostCreateComponent },
    // { path: '**', component: NotFoundComponent }, // Wildcard route for 404 pages
];
