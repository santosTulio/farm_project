import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Farm } from 'src/app/models/Farm';
import { FarmService } from 'src/app/services/farm.service';
import { FarmCreateComponent } from '../farm-create/farm-create.component';

@Component({
  selector: 'app-farm-edit',
  templateUrl: '../farm-create/farm-create.component.html',
  styleUrls: ['../farm-create/farm-create.component.scss']
})
export class FarmEditComponent extends FarmCreateComponent {

  farmSubscription!: Subscription;
  farm!: Farm;

  constructor(
    protected _farmService: FarmService,
    private _route: ActivatedRoute,
    protected _router: Router
  ) {
    super(_farmService,_router);
  }

  ngOnInit(): void {
    const farmId = parseInt(this._route.snapshot.paramMap.get('id')||'undefined');
    this.farmSubscription = this._farmService.read(farmId).subscribe(
      farm => {
        this.farm = farm
        this.nameFormControl.setValue(this.farm.name);
        this.areaFormControl.setValue(this.farm.area);
        this.centroidLatFormControl.setValue(this.farm.centroid[0]);
        this.centroidLngFormControl.setValue(this.farm.centroid[1]);
      },
      err => {
        this._router.navigate(['']);
      }
    )
  }

  saveHandler(e){
    const farm = {...this.farm};
    farm.name = this.nameFormControl.value;
    farm.area = this.areaFormControl.value;
    farm.centroid = [this.centroidLatFormControl.value,this.centroidLngFormControl.value];

    this._farmService.update(farm).subscribe((e)=>{
      this._router.navigate(['/details',farm.id]);
    });
  }

  cancelHandler(e){
    this._router.navigate(['/details',this.farm.id]);
  }

}
