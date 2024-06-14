'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const submitBtn = document.querySelector('.form__btn');

class newWorkout {
  constructor(distance, duration, cadence, elevation) {
    this.distance = distance;
    this.duration = duration;
    this.cadence = cadence;
    this.elevation = elevation;
  }
}

class Cycling extends newWorkout {
  constructor() {
    super(distance, duration, cadence, elevation);
  }
}

class Running extends newWorkout {
  constructor() {
    super(distance, duration, cadence, elevation);
  }
}

const run1 = new Running(23, 60, 2, 234);
console.log(run1);

class App {
  constructor() {
    this.getCurrentLocation;
    this.loadMap;
    this.newMarker;
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        currentPosition => {
          const { latitude, longitude } = currentPosition.coords;
          console.log(`latitude is: ${latitude}, longitude is: ${longitude}`);
          this.loadMap(latitude, longitude);
        },
        () => {}
      );
    }
  }
  loadMap(latitude, longitude) {
    const map = L.map('map').setView([latitude, longitude], 13);
    this.newMarker(map);
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);

    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    googleStreets.addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(
        L.popup({
          autoClose: false,
        })
      )
      .openPopup();
  }
  newMarker(map) {
    map.on('click', e => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng]).addTo(map).bindPopup().openPopup();
      form.classList.remove('hidden');
    });

    // submitBtn.addEventListener('submit', e => {
    //   L.marker([latitude, longitude]).popup('Hahahahah');
    // });
  }
}

const app1 = new App();
app1.getCurrentLocation();
