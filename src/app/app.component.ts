import {Component} from '@angular/core';
import {OnInit} from "@angular/core";
import {HttpService} from './http.service';
import {DetailComponent} from "./detail.component";
import {ViewContainerRef, ViewChild} from "@angular/core";
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("detailDialog") detailComponent: DetailComponent;

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
  viewContainerRef;

  public constructor(private httpService: HttpService, viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  onDetailClick(index) {
    this.tourObj = this.selectedData[index];
    this.detailComponent.openDialog();
  }

  ngOnInit() {
    this.getTour();
    this.initBookmarks();
    this.onScreenResize();
  }

  @HostListener("wondow:resize")
  onScreenResize() {
    this.isMobile = (innerWidth < this.MOBILE_SCREEN_WIDTH);
  }

  onAreaChange(index) {
    let area = this.areas[index];
    if (area.code === "BOOKMARK") {
      if (Object.keys(this.bookmarks).length === 0) {
        alert("ブックマークが登録されていません");
        return;
      }
      this.selectedData = Object.keys(this.bookmarks)
        .map(key => this.bookmarks[key]);
    } else {
      this.selectedData = area.data.data;
    }
    setTimeout(scroll(0,0), 1);
  }

  initBookmarks() {
    let storeData = localStorage.getItem("bookmarks");
    if (storeData) {
      this.bookmarks = JSON.parse(storeData);
    } else {
      this.bookmarks = {};
    }
  }

  onBookmarkClick(tourID, index) {
    if (!this.isMarked(tourID)) {
      if (Object.keys(this.bookmarks).length === 10) {
        return alert("ブックマークは最大10件です");
      }
      this.bookmarks[tourID] = this.selectedData[index];
    } else {
      delete this.bookmarks[tourID];
    }
    localStorage.setItem(
      "bookmarks", JSON.stringify(this.bookmarks));
  }

  isMarked(tourID) {
    return this.bookmarks[tourID];
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
