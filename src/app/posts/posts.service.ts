import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http
      .get<{message: String, post: Post}>(`http://localhost:3000/api/posts/${id}`)
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((tranformedData) => {
        this.posts = tranformedData;
        this.postUpdated.next([...this.posts]);
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title)
    postData.append('content', content);
    postData.append('image', image, title);

    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        const post: Post = { id: responseData.postId, title: title, content: content};
        post.id = responseData.postId
        console.log(post)
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {id: id, title: title, content: content}
    this.http.
      put(`http://localhost:3000/api/posts/${post.id}`, post)
      .subscribe(response => {
        const updatedPost = [...this.posts]
        const oldPostIndex = updatedPost.findIndex(p => p.id === post.id)
        updatedPost[oldPostIndex] = post
        this.posts = updatedPost
        this.postUpdated.next([...this.posts])
      })
  }

  deletePost(id: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== id)
        this.posts = updatedPosts
        this.postUpdated.next([...this.posts])
      })
  }
}
