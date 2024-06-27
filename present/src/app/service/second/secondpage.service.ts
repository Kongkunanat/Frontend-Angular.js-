
import { Injectable,NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SecondpageService {

  private  baseUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) { }


  create(data: any): Observable<any> {

    const formData = new FormData();
    formData.append('file', data);
    console.log("PPPd"+formData);
    return this.http.post(this.baseUrl+'/addImage', formData);
  }


}
