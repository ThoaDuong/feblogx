import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  list_post: any;
  post: any;
  user: any;
  role_update: boolean = false;
  role_delete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const post_id: string = this.route.snapshot.queryParamMap.get('id');
    this.list_post = await this.appService.getAllPosts();
    this.post = this.list_post.find(p => p._id == post_id);

    const list_users = await this.appService.getAllUsers();
    this.user = list_users.find(u => u._id == this.post.user_id);

    if(this.user && this.user.email === localStorage.getItem('blog_email')){
      this.role_update = true;
      this.role_delete = true;
    }
  }

  async onDeletePost(post_id){
    const result = confirm('Are you sure?');
    if(!result){
      return;
    }
    await this.appService.deletePost(post_id);
    this.router.navigateByUrl(`/profile?id=${this.user._id}`)
  }

}
