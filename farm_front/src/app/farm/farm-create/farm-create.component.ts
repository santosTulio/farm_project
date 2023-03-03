import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.component.html',
  styleUrls: ['./farm-create.component.scss']
})
export class FarmCreateComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  areaFormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  ownerFormControl = new FormControl(0, [Validators.required]);
  centroidLatFormControl = new FormControl(0, [Validators.required]);
  centroidLngFormControl = new FormControl(0, [Validators.required]);
  
  constructor(
    protected _farmService: FarmService,
    protected _router: Router
  ) {}

  ngOnInit(): void {

  }

  saveHandler(e){
    const farm = Object();
    farm.name = this.nameFormControl.value;
    farm.area = this.areaFormControl.value;
    farm.centroid = [this.centroidLatFormControl.value,this.centroidLngFormControl.value];

    this._farmService.create(farm).subscribe((e)=>{
      this._router.navigate(['']);
    });
  }

  cancelHandler(e){
    this._router.navigate(['']);
  }
}
