import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-forbidden-access',
  templateUrl: './forbidden-access.component.html',
  styleUrls: ['./forbidden-access.component.css']
})
export class ForbiddenAccessComponent implements OnInit {

  constructor(private appService : AppService) { }

  ngOnInit(): void {
    this.appService.clearStorage();
  }

}
