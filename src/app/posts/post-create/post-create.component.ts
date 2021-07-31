import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "post-create.component.html",
  styleUrls: ["post-create.component.css"]
})

export class PostCreateComponent {
  entenredTitle = ''
  enteredContent = ''
  @Output() postCreated = new EventEmitter<Post>()

  constructor(private postService: PostsService) {}

  onAddPost(form: NgForm) {
    this.postService.addPost(form.value.title, form.value.content)
    form.resetForm()
  }
}
