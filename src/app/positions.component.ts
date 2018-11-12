import { Component, OnInit } from '@angular/core';
import { PositionService } from './data/position.service';
import { Position } from './data/position';
import { Observable } from "rxjs";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styles: []
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean = false;
  constructor(private p: PositionService) { }

  ngOnInit() {

    this.p.getPositions().subscribe(
      positions => this.positions = positions,
      err => this.loadingError = true);
    if (this.loadingError) {
      console.log("An error has occurred.");
    }
    this.getPositionsSub = this.positions;


  }
  ngOnDestroy() {
    if (this.getPositionsSub) { this.getPositionsSub.unsubscribe(); }
  }

}

