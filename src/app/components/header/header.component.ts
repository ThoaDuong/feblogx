import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email: string = '';
  access_token: string = '';
  current_user: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const list_users = await this.appService.getAllUsers();
    this.route.queryParams.subscribe(params => {
      const val_email = params['email'];
      const val_token = params['token']
      if(val_email && val_token){
        localStorage.setItem('blog_email', val_email);
        localStorage.setItem('blog_token', val_token);
        localStorage.setItem('blog_time', Date.now().toString());
        this.router.navigateByUrl('home');
      }

      this.email = localStorage.getItem('blog_email');
      const start_date = new Date(parseInt(localStorage.getItem('blog_time')));
      const time_expire = (Date.now() - start_date.getTime()) / 1000 / 60 / 60;
      if(time_expire >= 24){
        this.onSignOut();
      }
      this.current_user = list_users.find(u => u.email === this.email);
    });
  }

  onSignOut(){
    localStorage.clear()
    this.email = '';
    this.access_token = '';
    this.current_user = null;
    this.router.navigateByUrl('home');
  }

}
