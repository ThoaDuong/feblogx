import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
  ) { }

  async loginWithGoogle(): Promise<any>{
    const url="http://localhost:3000/success";
    return await this.http.get<any>(url).toPromise()
      .catch(error => console.log('Error in getPost()'));
  }

  async getAllPosts(): Promise<any>{
    const url="http://localhost:3000/post/gets";
    return await this.http.get<any>(url).toPromise()
      .then(data => data.reverse())
      .catch(error => console.log('Error in getPost()'));
  }

  async createPost(data): Promise<any>{
    const url="http://localhost:3000/post/create";
    return await this.http.post<any>(url, data).toPromise()
      .catch(error => console.log('Error in createPost()'));
  }

  async updatePost(id, data): Promise<any>{
    const url=`http://localhost:3000/post/edit/${id}`;
    return await this.http.put<any>(url, data).toPromise()
      .catch(error => console.log('Error in updatePost()'));
  }

  async deletePost(id): Promise<any>{
    const url=`http://localhost:3000/post/delete/${id}`;
    return await this.http.delete<any>(url).toPromise()
      .catch(error => console.log('Error in deletePost()'));
  }

  async getAllUsers(): Promise<any>{
    const url="http://localhost:3000/user/gets";
    return await this.http.get<any>(url).toPromise()
      .catch(error => console.log('Error in getAllUsers()'));
  }
}
