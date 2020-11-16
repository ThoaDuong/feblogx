import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './../../app.service';
import { editorModulesConfig } from './editor.config';
import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorModules: any = editorModulesConfig;
  content: string = '';
  description: string = '';
  title: string = '';
  img_cover: any;
  edit_post: any;
  edit_post_id: string;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.edit_post_id = this.route.snapshot.queryParamMap.get('id');
    if(this.edit_post_id){
      this.initUpdatePost(this.edit_post_id);
    }
  }

  async initUpdatePost(id){
    const list_post = await this.appService.getAllPosts();
    this.edit_post = list_post.find(p => p._id === id);
    if(this.edit_post){
      this.title = this.edit_post.title;
      this.description = this.edit_post.description;
      this.img_cover = this.edit_post.img_cover;
      const ql_editor = document.getElementsByClassName('ql-editor');
      if(ql_editor[0]){
        ql_editor[0].innerHTML = this.edit_post.content;
      }
    }
  }

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection){
    this.content = event['editor']['root']['innerHTML'];
  }

  async onPublishPost(){
    const data = {
      title: this.title,
      content: this.content,
      description: this.description,
      img_cover: this.img_cover,
    }
    if(!this.edit_post_id){
      const create = await this.appService.createPost(data);
      this.router.navigateByUrl(`detail?id=${create._id}`);
    }
    else{
      await this.appService.updatePost(this.edit_post_id, data);
      this.router.navigateByUrl(`detail?id=${this.edit_post._id}`);
    }
  }

  async loadFile(event){
    const file = event.target.files[0];
    const base = await this.toBase64(file);
    this.img_cover = base;
  }

  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

}
