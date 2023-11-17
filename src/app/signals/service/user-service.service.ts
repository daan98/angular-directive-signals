import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { UserInfoInterface, UserInterface } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api/users';
  constructor() { }

  public getSingleUser(id : number) : Observable<UserInfoInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/${id}`)
    .pipe(
      map((response) => response.data),
      tap(() => console.log)
    )
  }
}
