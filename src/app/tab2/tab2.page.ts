import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  localAtual: string = '';
  apiKey: string = 'Sua_API_aqui';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude);
  }

  reverseGeocode(lat: number, lon: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${this.apiKey}`;
    this.http.get(url).subscribe((response: any) => {
      if (response.results && response.results.length > 0) {
        this.localAtual = response.results[0].formatted_address;
      }
    });
  }
}
