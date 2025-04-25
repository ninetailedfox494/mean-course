import { PostCreateComponent } from './../posts/post-create/post-create.component';
import { Injectable } from '@angular/core';
import { PostModel } from '../model/post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root', // This makes the service globally available (root level).
})
export class PostServices {
    private posts: any = [];
    private postUpdated = new Subject<{ posts: PostModel[], totalCount: number }>();

    constructor(private http: HttpClient) { }

    getPosts(pageSize: number, pageNumber: number) {
        const queryParams = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.http
            .get<{ message: string; data: any, totalCount: any }>(
                'http://localhost:3000/api/posts' + queryParams
            )
            .pipe(map((postData) => {
                return {
                    posts: postData.data.map((post: any) => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id,
                            imagePath: post.imagePath,
                        };
                    }),
                    totalCount: postData.totalCount,
                }
            }));
    }

    // getPostUpdateListener() {
    //     return this.postUpdated.asObservable();
    // }

    addPost(title: string, content: string, image: File) {
        // had 2 type push data via model
        //type 1: const post1 = new PostModel(1, form.value.title, form.value.content);
        // type 2:
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);

        return this.http
            .post<{ message: string, post: PostModel }>('http://localhost:3000/api/posts', postData);
    }

    deletePost(postId: string) {
        return this.http
            .delete('http://localhost:3000/api/posts/' + postId);
    }

    getPostById(id: string | null) {
        return this.http.get<{ message: string; data: any }>('http://localhost:3000/api/posts/' + id)
            .pipe(map((postData) => {
                return {
                    title: postData.data.title,
                    content: postData.data.content,
                    id: postData.data._id,
                    imagePath: postData.data.imagePath,
                };
            }
            ));
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: FormData | PostModel;
        if (typeof image === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
            };
        }

        return this.http
            .put('http://localhost:3000/api/posts/' + id, postData);
    }
}
