import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { Boardgame } from './boardgame';
import { HttpClient } from "@angular/common/http";
declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {
  

private url = "https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame";

  constructor(private http: HttpClient) {}
  

  getBoardGames(): Observable<any[]> {

      const jsonparser = require('xml2json');
      var bgarray : Boardgame[];

     fetch(this.url)
        .then(response => response.text())
        .then(data => {
          console.log(data);
          let parser = new DOMParser();
          let xml = parser.parseFromString(data, "application/xml");
          console.log(xml);
          
          let json = jsonparser.toJson(data);
     
          console.log(json);
          
          
        })
         
          //  xml.getElementsByTagName('item').forEach(element => {
          // var bg = new Boardgame
          // bg.BoardGameName = element.children[1]
          // bg.Thumbnail = element.children[0]
          // bg._id = element.children[2]
          // bgarray.push(bg)
          
        // })
        // })

    return this.http.get<Boardgame[]>(`${this.url}/boardgames`)
       
      }}

