import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';


@Injectable({providedIn: 'root'})
export class UserService {
 private host = environment.apiUrl;

 constructor(private http:HttpClient){}

 public getUsers(): Observable<User[] | HttpErrorResponse>{
   return this.http.get<User[]>(`${this.host}/user/list`);
 }

 public addUser(formData: FormData): Observable<User | HttpErrorResponse>{
   return this.http.post<User>(`${this.host}/user/add`, formData);
 }

 public updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
  return this.http.post<User>(`${this.host}/user/update`, formData);
 }

 public resetPassword(emial: string): Observable<CustomHttpResponse | HttpErrorResponse>{
  return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${emial}`);
 }

 public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
  return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
  {reportProgress: true,
    observe: 'events'
  });
}

 public deleteUser(username: string): Observable< CustomHttpResponse| HttpErrorResponse >{
  return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
 }

 public addUserToLocalCache(users: User[]): void {
  localStorage.setItem('users', JSON.stringify(users));
 }

 public getUsersFromLocalCache(): User[] {
  if(localStorage.getItem('users')) {
    return JSON.parse(localStorage.getItem('users'));
  }
  return null;
 }


 public  createUserFormData(loggedInUsername: string, user : User, profileImage: File): FormData {
  const formData = new FormData();
  formData.append('currentUser',loggedInUsername);
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('username', user.username);
  formData.append('email', user.email);
  formData.append('role', user.roles);
  formData.append('isActive', JSON.stringify(user.active));
  formData.append('isNotLocked', JSON.stringify(user.notLocked));
  formData.append('profileImage', profileImage);
 return formData;
}


}
