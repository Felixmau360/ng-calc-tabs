import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

declare var google: any;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
  map: any;
  mapId: string = '1532e00fbac2f7d1'; // Seu Map ID
  geocoder = new google.maps.Geocoder();
  userAddress: string = '';
  
  constructor(private alertController: AlertController) {}
  
  async ngAfterViewInit() {
    try {
        const coordinates = await this.getAveragePosition();
        
        if (coordinates && coordinates.coords) {
            const latLng = {
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude
            };
            
            this.initMap(latLng);
            this.createCurrentLocationMarker(latLng);
            this.addRecenterButton();
            this.geocodeLatLng(latLng);
            this.findNearbyGasStations(latLng);
        }
    } catch (error) {
        const alert = await this.alertController.create({
            header: 'Erro de Localização',
            message: 'Verifique se o GPS está ativado e se o aplicativo tem permissão para usá-lo',
            buttons: ['OK']
        });
        
        await alert.present();
    }
}

  async getCurrentPosition() {
    let tentativas = 0;
    const maxTentativas = 3;
    
    while (tentativas < maxTentativas) {
        const position = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        });
        
        if (position.coords.accuracy <= 20) { // precisão em metros
            return position;
        }
        
        tentativas++;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Não foi possível obter uma localização precisa');
}
async getAveragePosition() {
  const amostras = 3;
  const posicoes = [];
  
  for (let i = 0; i < amostras; i++) {
      const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0
      });
      
      posicoes.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const mediaLat = posicoes.reduce((acc, pos) => acc + pos.lat, 0) / amostras;
  const mediaLng = posicoes.reduce((acc, pos) => acc + pos.lng, 0) / amostras;
  
  return {
      coords: {
          latitude: mediaLat,
          longitude: mediaLng
      }
  };
}





  initMap(latLng: { lat: number; lng: number }) {
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapId: this.mapId,
    };

    const mapElement = document.getElementById('map');
    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  createCurrentLocationMarker(latLng: { lat: number; lng: number }) {
    const pinElement = new google.maps.marker.PinElement({
      background: '#1A73E8',
      borderColor: '#FFFFFF',
      glyphColor: '#FFFFFF',
      scale: 1.2
    });
  
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: latLng,
      title: 'Sua localização',
      content: pinElement.element
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
      radius: 5000, // 5 km
      type: 'gas_station',
    };

    service.nearbySearch(request, (results: any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => this.createNearbyPlaceMarker(place));
      }
    });
  }

  createNearbyPlaceMarker(place: any) {
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fa-solid fa-gas-pump"></i>';
    icon.style.fontSize = '16px';
    
    const faPin = new google.maps.marker.PinElement({
      glyph: icon,
      glyphColor: '#FFFFFF',
      background: '#66e253',
      borderColor: '#FFFFFF',
      scale: 1.1
    });
  
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: place.geometry.location,
      title: place.name,
      content: faPin.element
    });
  
    marker.addListener('click', async () => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
    
      const navigationUrl = `geo:${lat},${lng}?q=${lat},${lng}`;
      window.open(navigationUrl, '_system');
    });
   }
  
  addRecenterButton() {
    const recenterButton = document.createElement('button');
    recenterButton.innerHTML = `<ion-icon name="location-sharp" style="margin-right: 8px; color: #1a73e8;"></ion-icon>Meu Local`;
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
