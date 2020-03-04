import { Component, OnInit } from '@angular/core';
import { BoardgameService} from './data/boardgame.service';
import { Boardgame } from './data/boardgame'
import { Observable } from "rxjs";

@Component({
  selector: 'app-boardgames',
  templateUrl: './boardgames.component.html',
  styles: []
})
export class BoardgamesComponent implements OnInit {

  boardgames: Boardgame[];
  getBoardgamesSub: any;
  loadingError: boolean = false;
  constructor(private e: BoardgameService) { }
  ngOnInit() {

    this.e.getBoardGames().subscribe(
      boardgames => this.boardgames = boardgames,
      err => this.loadingError = true);
    if (this.loadingError) {
      console.log("An error has occurred.");
    }
    this.getBoardgamesSub = this.boardgames;
  }

  ngOnDestroy() {
    if (this.getBoardgamesSub) { this.getBoardgamesSub.unsubscribe(); }
  }
}
