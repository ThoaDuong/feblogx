import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-basic',
  templateUrl: './home-basic.component.html',
  styleUrls: ['./home-basic.component.scss']
})
export class HomeBasicComponent implements OnInit {
  list_posts = [];
  latest_posts = [];
  key_word: string = '';
  p: number = 1;

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    this.list_posts = await this.appService.getAllPosts();
    const length = this.list_posts.length;

    if(length > 4){
      this.latest_posts = this.list_posts.slice(length-4, length);
    }
    else{
      this.latest_posts = this.list_posts;
    }
  }

  async onSearchHandle(){
    const default_posts = await this.appService.getAllPosts();
    this.list_posts = default_posts.filter(p => p.title.toLowerCase().match(this.key_word.toLowerCase()));
  }

}
