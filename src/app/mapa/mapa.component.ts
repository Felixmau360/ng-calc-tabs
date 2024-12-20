import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
  map: any;
  mapId: string = '1532e00fbac2f7d1'; // Seu Map ID
  geocoder: any;
  userAddress: string = '';
  
  constructor() {}
  
  async ngAfterViewInit() {
    try {
      const coordinates = await this.getCurrentPosition();
      const latLng = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      this.initMap(latLng);
      this.createCurrentLocationMarker(latLng);
      this.addRecenterButton();
      this.geocodeLatLng(latLng);
      this.findNearbyGasStations(latLng);
    } catch (error) {
      console.error('Erro ao obter a posição atual:', error);
    }
  }

  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition();
  }

  initMap(latLng: { lat: number; lng: number }) {
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapId: this.mapId,
    };

    const mapElement = document.getElementById('map');
    this.map = new google.maps.Map(mapElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();
  }

  createCurrentLocationMarker(latLng: { lat: number; lng: number }) {
    new google.maps.Marker({
      map: this.map,
      position: latLng,
      title: 'Sua localização',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#0000FF',
        fillOpacity: 1,
        scale: 10,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      },
    });
  }

  geocodeLatLng(latLng: { lat: number; lng: number }) {
    this.geocoder.geocode({ location: latLng }, (results: any[], status: string) => {
      if (status === 'OK' && results?.length > 0) {
        this.userAddress = results[0].formatted_address;
        console.log('Endereço:', this.userAddress);
      } else {
        console.error('Erro na geocodificação:', status);
      }
    });
  }

  findNearbyGasStations(latLng: { lat: number; lng: number }) {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: latLng,
      radius: 5000,
      type: 'gas_station',
    };

    service.nearbySearch(request, (results: any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => this.createNearbyPlaceMarker(place));
      }
    });
  }

  createNearbyPlaceMarker(place: any) {
    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      title: place.name,
    });

    marker.addListener('click', () => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      const wazeUrl = `waze://?ll=${lat},${lng}&navigate=yes`;

      const isGoogleMapsOpened = window.open(googleMapsUrl, '_system');
      if (!isGoogleMapsOpened) {
        window.open(wazeUrl, '_system');
      }
    });

    async function openLink(url: string) {
      await Browser.open({ url });
    }

    marker.addListener('click', () => {
      // Coordenadas do posto selecionado
      const destinationLat = place.geometry.location.lat();
      const destinationLng = place.geometry.location.lng();
  
      // URL para Google Maps
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
  
      // URL para Waze
      const wazeUrl = `https://www.waze.com/ul?ll=${destinationLat},${destinationLng}&navigate=yes`;
  
      // Opções para o usuário (Google Maps ou Waze)
      if (confirm('Deseja navegar até este posto usando Google Maps? Cancelar para usar Waze.')) {
        openLink(googleMapsUrl);
      } else {
        openLink(wazeUrl);
      }
    });
  }

  addRecenterButton() {
    const recenterButton = document.createElement('button');
    recenterButton.innerHTML = `<ion-icon name="location-sharp" style="margin-right: 8px;"></ion-icon>Meu Local`;
    recenterButton.classList.add('recenter-button');

    recenterButton.addEventListener('click', async () => {
      try {
        const coordinates = await this.getCurrentPosition();
        if (coordinates && coordinates.coords) {
          const newLatLng = {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
          };
          this.map.setCenter(newLatLng);
        }
      } catch (error) {
        console.error('Erro ao obter a posição atual:', error);
      }
    });

    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(recenterButton);
  }
}
