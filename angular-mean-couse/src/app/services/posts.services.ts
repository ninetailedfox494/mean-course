import { Injectable } from '@angular/core';
import { PostModel } from '../model/post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root', // This makes the service globally available (root level).
})
export class PostServices {
    private posts: any = [];
    private postUpdated = new Subject<PostModel[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http
            .get<{ message: string; data: any }>(
                'http://localhost:3000/api/posts'
            )
            .pipe(map((postData) => {
                return postData.data.map((post: any) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                    };
                });
            }))
            .subscribe((res) => {
                this.posts = res;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        // had 2 type push data via model
        //type 1: const post1 = new PostModel(1, form.value.title, form.value.content);
        // type 2:
        const param: PostModel = {
            id: '',
            title,
            content,
        };

        this.http
            .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', param)
            .subscribe((res) => {
                param.id = res.postId;
                this.posts.push(param);
                this.postUpdated.next([...this.posts]);
            });
    }

    deletePost(postId: string) {
        this.http
            .delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(
                    (post: PostModel) => post.id !== postId
                );
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostById(id: string | null) {
        return this.http.get<{ message: string; data: any }>('http://localhost:3000/api/posts/' + id)
            .pipe(map((postData) => {
                return {
                    title: postData.data.title,
                    content: postData.data.content,
                    id: postData.data._id,
                };
            }
            ));
    }

    updatePost(id: string, title: string, content: string) {
        const param: PostModel = {
            id,
            title,
            content,
        };

        this.http
            .put('http://localhost:3000/api/posts/' + id, param)
            .subscribe((res) => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(
                    (p: PostModel) => p.id === param.id
                );
                updatedPosts[oldPostIndex] = param;
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}
