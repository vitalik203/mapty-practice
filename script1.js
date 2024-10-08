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

class App {
  constructor() {
    this.getPosition;
    this.loadMap;
  }

  //Methods
  //   loadMap(lat, lng) {
  //     const map = L.map('map').setView([lat, lng], 13);

  //     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution:
  //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     }).addTo(map);

  //     L.marker([lat, lng])
  //       .addTo(map)
  //       .bindPopup('A pretty CSS popup.<br> Easily customizable.')
  //       .openPopup();
  //   }
  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (e) {
          const { latitude, longitude } = e.coords;
          loadMap(latitude, longitude);
        },
        function () {
          console.log('Error');
        }
      );
    }
  }
}

const app1 = new App();
app1.getPosition();
