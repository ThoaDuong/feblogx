import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  current_user: any;
  current_posts: any;
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
  ) { }

  async ngOnInit(): Promise<void> {
    const user_id: string = this.route.snapshot.queryParamMap.get('id');
    const list_users = await this.appService.getAllUsers();
    this.current_user = list_users.find(u => u._id === user_id);

    const list_posts = await this.appService.getAllPosts();
    this.current_posts = list_posts.filter(p => p.user_id === user_id);
  }

}
