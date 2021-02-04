import {  Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  //constructor(http:HttpClient) { }
  
  constructor() { }   //comment this line and uncomment the line above to see the error

  ngOnInit(): void {
  }

}