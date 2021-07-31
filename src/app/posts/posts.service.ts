import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {}

  getPostUpdatedListener(){
    return this.postUpdated.asObservable()
  }

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').
      subscribe((postsData) => {
        this.posts = postsData.posts
        this.postUpdated.next([...this.posts])
      })
  }

  addPost(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }


}
