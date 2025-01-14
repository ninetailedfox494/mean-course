import { Injectable } from '@angular/core';
import { PostModel } from '../model/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root', // This makes the service globally available (root level).
})
export class PostServices {
    private posts: PostModel[] = [];
    private postUpdated = new Subject<PostModel[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http
            .get<{ message: string; data: PostModel[] }>(
                'http://localhost:3000/api/posts'
            )
            .subscribe((res) => {
                this.posts = res.data;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const id =
            this.posts.length > 0
                ? Math.max.apply(
                    Math,
                    this.posts.map(function (o) {
                        return o.id;
                    })
                )
                : 0;

        // had 2 type push data via model
        //type 1: const post1 = new PostModel(1, form.value.title, form.value.content);
        // type 2:
        const param: PostModel = {
            id: id + 1,
            title,
            content,
        };

        this.http
            .post<{ message: string }>('http://localhost:3000/api/posts', param)
            .subscribe((res) => { 
                console.log(res.message);
                this.posts.push(param);
                this.postUpdated.next([...this.posts]);
            });
    }
}
