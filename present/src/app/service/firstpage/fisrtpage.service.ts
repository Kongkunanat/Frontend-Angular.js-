
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../../models/Image';


const baseUrl = 'http://localhost:9090/api';


@Injectable({
  providedIn: 'root'
})
export class FisrtpageService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl+'/getAllImage');
  }

  get(id: any): Observable<Image> {
    return this.http.get(`${baseUrl}/getImageById//${id}`);
  }

  delete(element: number): Observable<any> {
    console.log(element);
    return this.http.delete(`${baseUrl}/deleteImageById/${element}`);
  }


  // findByTitle(title: any): Observable<Image[]> {
  //   return this.http.get<Image[]>(`${baseUrl}?title=${title}`);
  // }
}
