import { Injectable } from "@angular/core";
import { PostModel } from "../model/post.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root', // This makes the service globally available (root level).
})

export class PostServices {
    private posts: PostModel[] = [];
    private postUpdated = new Subject<PostModel[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const id = this.posts.length > 0 ? Math.max.apply(Math, this.posts.map(function (o) { return o.id; })) : 0;

        // had 2 type push data via model 
        //type 1: const post1 = new PostModel(1, form.value.title, form.value.content);
        // type 2:
        const post: PostModel = {
            id: id + 1, title, content
        };
        
        this.posts.push(post);

        this.postUpdated.next([...this.posts]);
    }
}