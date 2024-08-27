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
class App {
  constructor() {
    this.getCurrentLocation;
    this.loadMap;
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
      L.marker([lat, lng])
        .addTo(map)
        // .bindPopup(
        //   'Current position',
        //   L.popup({
        //     autoClose: false,
        //   })
        // )
        .openPopup();
        form.addEventListener()
      form.classList.remove('hidden');
      form.addEventListener('keydown', e => {
        // e.preventDefault();
        // console.log(e);

        // console.log(e);

        if (e.key === 'Enter') {
          e.preventDefault();
          console.log(e);

          // Get type
          const type = inputType.value;
          const distance = inputDistance.value;
          const duration = inputDuration.value;

          // If cycling
          if (type === 'cycling') {
            .classList.toggle('hidden');
          }

          // If running

          if (type === 'running') {
            inputElevation.classList.toggle('hidden');
          }

          // Check if values arent negative

          // Create object

          // Add object into array

          //   form.classList.add('hidden');
        }
      });
      //   console.log(e.latlng);
      //   const { lat, lng } = e.latlng;
      //   L.marker([lat, lng])
      //     .addTo(map)
      //     .bindPopup(
      //       'Current position',
      //       L.popup({
      //         autoClose: false,
      //       })
      //     )
      //     .openPopup();
    });
  }
  //   cycling(dis, dur, sp, elev, container) {
  //     container.insertAdjacentHTML(
  //       'beforeend',
  //       `<li class="workout workout--cycling" data-id="1234567891">
  //             <h2 class="workout__title">Cycling on April 5</h2>
  //             <div class="workout__details">
  //               <span class="workout__icon">🚴‍♀️</span>
  //               <span class="workout__value">${dis}</span>
  //               <span class="workout__unit">km</span>
  //             </div>
  //             <div class="workout__details">
  //               <span class="workout__icon">⏱</span>
  //               <span class="workout__value">${dur}</span>
  //               <span class="workout__unit">min</span>
  //             </div>
  //             <div class="workout__details">
  //               <span class="workout__icon">⚡️</span>
  //               <span class="workout__value">${sp}</span>
  //               <span class="workout__unit">km/h</span>
  //             </div>
  //             <div class="workout__details">
  //               <span class="workout__icon">⛰</span>
  //               <span class="workout__value">${elev}</span>
  //               <span class="workout__unit">m</span>
  //             </div>
  //           </li>`
  //     );
  //   }

  //   running(dis, dur, sp, elev, container) {
  //     // container.insertAdjacentHTML(
  //     //   'beforeend',

  //     // );
  //     let workoutDiv = document.createElement('div');
  //     workoutDiv.textContent = `<li class="workout workout--running" data-id="1234567890">
  //     <h2 class="workout__title">Running on April 14</h2>
  //     <div class="workout__details">
  //       <span class="workout__icon">🏃‍♂️</span>
  //       <span class="workout__value">${dis}</span>
  //       <span class="workout__unit">km</span>
  //     </div>
  //     <div class="workout__details">
  //       <span class="workout__icon">⏱</span>
  //       <span class="workout__value">${dur}</span>
  //       <span class="workout__unit">min</span>
  //     </div>
  //     <div class="workout__details">
  //       <span class="workout__icon">⚡️</span>
  //       <span class="workout__value">${sp}</span>
  //       <span class="workout__unit">min/km</span>
  //     </div>
  //     <div class="workout__details">
  //       <span class="workout__icon">🦶🏼</span>
  //       <span class="workout__value">${elev}</span>
  //       <span class="workout__unit">spm</span>
  //     </div>
  //   </li>`;
  //     container.append(workoutDiv);
  //   }
  //   newMarker(map) {
  //     map.on('click', e => {
  //       if (form.classList.contains('hidden')) {
  //         const { lat, lng } = e.latlng;
  //         L.marker([lat, lng]).addTo(map);
  //         form.classList.remove('hidden');
  //         form.addEventListener('submit', e => {
  //           e.preventDefault();
  //           if ((e.key = 'Enter')) {
  //             form.classList.add('hidden');
  //             let type = inputType.value;
  //             console.log(type);
  //             const distance = inputDistance.value;
  //             const duration = inputDuration.value;
  //             const cadence = inputCadence.value;
  //             const elevation = inputElevation.value;
  //             L.marker([lat, lng]).addTo(map).bindPopup().openPopup();
  //             if (type === 'cycling') {
  //               this.cycling(
  //                 distance,
  //                 duration,
  //                 cadence,
  //                 elevation,
  //                 containerWorkouts
  //               );
  //               preventDefault();
  //             } else {
  //               this.running(
  //                 distance,
  //                 duration,
  //                 cadence,
  //                 elevation,
  //                 containerWorkouts
  //               );
  //               preventDefault();
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }
}

const app1 = new App();
app1.getCurrentLocation();
