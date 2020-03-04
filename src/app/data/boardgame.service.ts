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

      const jsonparser = require('xml2js').parseString;
      var bgarray : Boardgame[];

     fetch(this.url)
        .then(response => response.text())
        .then(data => {
          console.log(data);
          let parser = new DOMParser();
          let xml = parser.parseFromString(data, "application/xml");
          console.log(xml);
          
        // let json = jsonparser(data, function (err, result) {
        //   console.log(result.items.item[0].yearpublished[0].$.value); //year of board game
        //   console.log(result.items.item[0].name[0].$.value);//name of the board game
        //     console.log(result.items.length());
            
           
        // });
            var len = xml.getElementsByTagName('item').length;
            var items = xml.getElementsByTagName('item');

            for( var i = 0;i< len;i++){  
              var bg = new Boardgame();
              bg.BoardGameName = items[i].children[1].getAttribute('value');
              bg.Thumbnail = items[i].children[0].getAttribute('value');
              bg._id = items[i].getAttribute('id');
                bgarray.push(bg);
            }

          
        //    xml.getElementsByTagName('item').forEach(element => {
        //   var bg = new Boardgame
        //   bg.BoardGameName = element.children[1]
        //   bg.Thumbnail = element.children[0]
        //   bg._id = element.children[2]
        //   bgarray.push(bg)
        // })
         
          
          
         console.log(bgarray);
         })

    return this.http.get<Boardgame[]>(`${this.url}/boardgames`)
       
      }}

