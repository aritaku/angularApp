import {Component} from '@angular/core';
import {OnInit} from "@angular/core";
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tourObj;
  selectedData;
  bookmarks;
  isMobile = false;
  MOBILE_SCREEN_WIDTH = 768;
  isCollapsed = false;
  areas = [
    {code: "BCH", name: "ビーチリゾート", data: null},
    {code: "EUR", name: "ヨーロッパ", data: null},
    {code: "DUS", name: "アメリカ", data: null},
    {code: "BOOKMARK", name: "お気に入り", data: null},
  ];

  public constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getTour();
  }

  getTour() {
    this.selectedData = null;
    for (let i = 0; i < this.areas.length; i++) {
      let areaCode = this.areas[i].code;
      if (areaCode === "BOOKMARK") {
        continue;
      }
      this.httpService.getTourData(areaCode)
        .subscribe(
          result => this.setTour(result, i),
          error => alert("通信エラー¥n" + error)
      );
    }
  }

  setTour(result, i) {
    if (result.error) {
      alert("Web APIエラー¥n" + result.message);
      return;
    }
    this.areas[i].data = result;
  }

}
