import { Component, OnInit } from '@angular/core';
import { Farm } from '../models/Farm';
import { FarmService } from '../services/farm.service';

@Component({
  selector: 'app-dashboard',  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  gridData: Farm[] = [];

  constructor(
    private _farmService: FarmService
  ){}

  ngOnInit(): void {
    this._farmService.list().subscribe( farms => this.gridData = farms);
  }
}
