import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly messageUrl = 'http://localhost:3000/direct-message';

  constructor(private http: HttpClient) {}

 
}