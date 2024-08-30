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

  newWorkOut(type, distance, duration, lastOne, coords) {
    if (type === 'running') {
      const run = new Running(coords, type, distance, duration, lastOne);
      workOutArray.push(run);
      console.log(run);

      // this.arr.push(run);
    }

    if (type === 'cycling') {
      const cycl = new Cycling(coords, type, distance, duration, lastOne);
      workOutArray.push(cycl);
      console.log(cycl);

      // this.arr.push(cycl);
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
  // addMarker(map, lat, lng) {

  //   L.marker(lat, lng).addTo(map);
  // } ////////////////////////////////////////////////////////////////////
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
        // If running
        if (type === 'running') {
          const cadence = +inputCadence.value;
          if (!this.isFiniteArr([distance, duration, cadence]) === false) {
            alert('Numbers must be positive!');
          } else {
            alert('All is good');
            this.newWorkOut(
              type,
              distance,
              duration,
              cadence,
              this.coords,
              this.newWorkOutArr
            );
            const { lat, lng } = this.coords;
            console.log(lat, lng);
            L.marker([lat, lng]).addTo(this.mapAdd);
            form.classList.add('hidden');
            inputDistance.value = '';
            inputDuration.value = '';
            inputCadence.value = '';
            console.log(workOutArray);
          }
        }

        //If cycling
        if (type === 'cycling') {
          const elevation = +inputElevation.value;
          if (!this.isFiniteArr([distance, duration, elevation]) === false) {
            alert('Numbers must be positive!');
          } else {
            alert('All is good');
            this.newWorkOut(
              type,
              distance,
              duration,
              elevation,
              this.coords,
              this.newWorkOutArr
            );
            const { lat, lng } = this.coords;
            console.log(lat, lng);
            L.marker([lat, lng]).addTo(this.mapAdd);
            form.classList.add('hidden');
            inputDistance.value = '';
            inputDuration.value = '';
            inputElevation.value = '';
            console.log(workOutArray);
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
  renderMarkers(arr, m) {
    arr.forEach(e => {
      const { lat, lng } = e.coords;
      L.marker([lat, lng]).addTo(m);
    });
  }
}

const app1 = new App();
app1.getCurrentLocation();
