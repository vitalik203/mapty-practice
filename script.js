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

const workOutArray = [];

class AddNewWorkout {
  constructor(coords, type, distance, duration) {
    this.coords = coords;
    this.type = type;
    this.distance = distance;
    this.duration = duration;
    this.renderMarkers;
  }
}

class Cycling extends AddNewWorkout {
  constructor(coords, type, distance, duration, elevation) {
    super(coords, type, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
  }
  calcSpeed() {
    this.speed = this.distance / this.duration;
  }
}

class Running extends AddNewWorkout {
  constructor(coords, type, distance, duration, cadence) {
    super(coords, type, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
  }
}

class App {
  constructor() {
    this.getCurrentLocation;
    this.loadMap;
    this.newWorkOut;
    this.workOut;
    this.isFiniteArr;
    this.addMarker;
    this.mapAdd;
    this.initialGetArray;
    //Handlers
    form.addEventListener('submit', this.workOut.bind(this));
    inputType.addEventListener('change', () => {
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
    });
  }
  coords;
  newWorkOutArr = [];
  mapAdd;
  isFiniteArr(arr) {
    arr.forEach(e => {
      if (e < 0 || isFinite(e) === false) {
        return false;
      } else {
        return true;
      }
    });
  }
  initialGetArray() {
    let outputArr = localStorage.getItem('arr');
    outputArr = JSON.parse(outputArr);
    outputArr.forEach(e => {
      const { lat, lng } = e.coords;
      L.marker([lat, lng]).addTo(this.mapAdd);
    });
  }
  newWorkOut(type, distance, duration, lastOne, coords) {
    if (type === 'running') {
      const run = new Running(coords, type, distance, duration, lastOne, id);
      workOutArray.push(run);
      localStorage.setItem('arr', JSON.stringify(workOutArray));
      console.log(run);
    }

    if (type === 'cycling') {
      const cycl = new Cycling(coords, type, distance, duration, lastOne, id);
      workOutArray.push(cycl);
      localStorage.setItem('arr', JSON.stringify(workOutArray));
      console.log(cycl);
    }
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
  workOut(e) {
    if (form.classList.contains('hidden')) {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      const type = inputType.value;
      const distance = +inputDistance.value;
      const duration = +inputDuration.value;
      if (inputDistance.value === '' || inputDuration.value === '') {
        alert('Fill data first!');
      } else if (distance < 0 || duration < 0) {
        alert('Data should be positive!');
      } else {
        // localStorage.remove(this.newWorkOutArr);
        // If running
        if (type === 'running') {
          const cadence = +inputCadence.value;
          if (!this.isFiniteArr([distance, duration, cadence]) === false) {
            alert('Numbers must be positive!');
          } else {
            alert('All is good');
            idd = +`${Math.floor(Math.random() * 9)}${Math.floor(
              Math.random() * 9
            )}${Math.floor(Math.random() * 9)}`;
            this.newWorkOut(
              type,
              distance,
              duration,
              cadence,
              this.coords,
              this.newWorkOutArr,
              idd
            );
            const { lat, lng } = this.coords;
            console.log(lat, lng);
            const popupEx = L.popup({
              autoClose: false,
              closeOnClick: false,
              content: `Workout ${type}`,
            });
            L.marker([lat, lng])
              .addTo(this.mapAdd)
              .bindPopup(popupEx)
              .openPopup();
            form.classList.add('hidden');
            inputDistance.value = '';
            inputDuration.value = '';
            inputCadence.value = '';
            console.log(workOutArray);
            console.log(id);

            this.initialGetArray();

            let html = `<li class="workout workout--${type}" data-id="1234567890">
          <h2 class="workout__title">Running on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${cadence}</span>
            <span class="workout__unit">min/km</span>
          </div>
          </li>
          `;

            form.insertAdjacentHTML('afterend', html);
          }
        }

        //If cycling
        if (type === 'cycling') {
          const elevation = +inputElevation.value;
          if (!this.isFiniteArr([distance, duration, elevation]) === false) {
            alert('Numbers must be positive!');
          } else {
            alert('All is good');
            idd = `${Math.floor(Math.random() * 9)}${Math.floor(
              Math.random() * 9
            )}${Math.floor(Math.random() * 9)}`;
            this.newWorkOut(
              type,
              distance,
              duration,
              elevation,
              this.coords,
              this.newWorkOutArr,
              idd
            );
            const { lat, lng } = this.coords;
            console.log(lat, lng);
            const popupEx = L.popup({
              autoClose: false,
              closeOnClick: false,
              content: `Workout ${type}`,
            });
            L.marker([lat, lng])
              .addTo(this.mapAdd)
              .bindPopup(popupEx)
              .openPopup();
            form.classList.add('hidden');
            inputDistance.value = '';
            inputDuration.value = '';
            inputElevation.value = '';
            console.log(workOutArray);
            this.initialGetArray();
            console.log(id);

            let html = `<li class="workout workout--${type}" data-id="1234567890">
          <h2 class="workout__title">Running on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
          `;
            form.insertAdjacentHTML('afterend', html);
          }
        }
      }
    }
  }
  loadMap(latitude, longitude) {
    let map = L.map('map').setView([latitude, longitude], 13);
    this.mapAdd = map;
    L.marker([latitude, longitude]).addTo(map);

    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    googleStreets.addTo(map);

    map.on('click', el => {
      const { lat, lng } = el.latlng;
      this.coords = el.latlng;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }
}

const app1 = new App();
app1.getCurrentLocation();
