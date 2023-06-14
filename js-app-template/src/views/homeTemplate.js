import { html } from 'lit-html';
import page from 'page';
import layoutTemplate from '../views/layoutTemplate.js';
import 'iconify-icon';


export class HomeView extends LitElement {

  static properties = {
    userAddress: {},
  };

  constructor() {
    super();
    this.userAddress = 'Voenna Rampa 2, 1618 Sofia, Bulgaria';
  }

  async getUserAddress() {
    const userLocation = await navigator.geolocation.getCurrentPosition();

    const address = await getAddressFromLatLon(userLocation.coords.latitude, userLocation.coords.longitude);

    async function getAddressFromLatLon(lat, lon) {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data.address) {
        return `${data.address.road} ${data.address.house_number}, ${data.address.postcode} ${data.address.city}`;
      } else {
        throw new Error('Unable to get address from latitude and longitude');
      }
    }

    return address;
  }

  handleRedirect() {
    page('/catalog');
  }

  render() {
    return html `
    <div class="relative h-[85vh]">
      <div class="absolute z-10 text-white h-full w-[55%] flex flex-col justify-center">
        <div class="absolute bg-red-500 h-full w-[80%] left-0 top-0"></div>
        <div class="absolute bg-red-500 h-full w-96 right-0 top-0 transform skew-x-[-20deg]"></div>
        <div class="pl-12 relative">
          <h1 class="text-5xl mb-2 drop-shadow-lg">Shop Local, Support Local</h1>
          <h2 class="text-lg mb-6 drop-shadow-lg">Order food directly from local suppliers</h2>
          <div class="relative w-2/3">
            <input type="text" name="search" id="search" class="w-full block p-4 pr-10 rounded-md shadow-sm text-black sm:text-sm" placeholder="Enter your location..." value="${this.userAddress}">
            <span @click="${handleRedirect}" class="absolute inset-y-0 right-0 flex items-center pr-3 text-2xl text-gray-600 hover:text-black cursor-pointer">
              <iconify-icon icon="material-symbols:send-rounded"></iconify-icon>
            </span>
          </div>
        </div>
      </div>
      <img class="relative -right-24 z-0 ml-auto h-full" src="../src/assets/hero_banner.jpg">
    </div>
  `;
  }
}

customElements.define('home-view', HomeView);