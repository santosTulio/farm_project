import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureAddon, getOlFeatures } from '@common/feature';
import { Subscription } from 'rxjs';
import { BasemapComponent } from 'src/app/basemap/basemap.component';
import { MapService } from 'src/app/map.service';
import { Farm } from 'src/app/models/Farm';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-farm-detail',
  templateUrl: './farm-detail.component.html',
  styleUrls: ['./farm-detail.component.scss']
})
export class FarmDetailComponent implements OnInit, OnDestroy {

  @ViewChild('map') map!: BasemapComponent;

  farmSubscription!: Subscription;
  farm!: Farm;

  constructor(
    private _farmService: FarmService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const farmId = parseInt(this._route.snapshot.paramMap.get('id')||'undefined');
    
    this.farmSubscription = this._farmService.read(farmId).subscribe(
      farm => {
        this.farm = farm
        var feature = getOlFeatures({type: 'Feature', geometry: this.farm.geometry});
        this.map.includeAddon(new FeatureAddon({identifier:'farm_geometry', feature}));
      },
      err => {
        this._router.navigate(['']);
      }
    )
  }

  deleteHandler(){
    this._farmService.delete(this.farm.id||0).subscribe(
      res => this._router.navigate(['']),
      err => this._router.navigate(['']),
    )
  }

  ngOnDestroy() {
    this.farmSubscription.unsubscribe();
  }

}
