import { AppService } from './../../app.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post;
  user: any;

  constructor(
    private appService: AppService
  ) { }

  async ngOnInit(): Promise<void> {
    const list_users = await this.appService.getAllUsers();
    this.user = list_users.find(u => u._id === this.post.user_id);
  }

}
