import { LitElement, html } from 'lit';
import page from 'page';
import { TWStyles } from '../../tw.js';
import 'iconify-icon';

export class HomeView extends LitElement {

  static properties = {
    userAddress: {},
  };

  static styles = TWStyles;

  constructor() {
    super();
    this.userAddress = '';
  }

  async getUserAddress() {
    let userLocation = {};

    try {
      userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
    catch (error) {
      console.log(error);
      return '';
    }

    const address = await getAddressFromLatLon(userLocation.coords.latitude, userLocation.coords.longitude);

    console.log(address);

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

  async handleSearch() {
    console.log(this.userAddress);
    const addressInput = this.shadowRoot.querySelector('#search');
    try {
      const { lat, lon } = await this.getCoordinatesFromAddress(this.userAddress);
      // Redirect to /catalog with the latitude and longitude as URL parameters
      page(`/catalog?lat=${lat}&lon=${lon}`);
    } catch (error) {
      addressInput.setCustomValidity('Please enter a valid address');
      addressInput.reportValidity();
    }
  }
  
  async getCoordinatesFromAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } else {
      addressInput.setCustomValidity('Please enter a valid address');
      addressInput.reportValidity();
    }
  }

  firstUpdated() {
    super.firstUpdated();

    this.getUserAddress().then((address) => {
      this.userAddress = address;
    });
  }

  render() {
    return html`
    <header class="md:px-16 px-4 py-6">
      <nav class="flex justify-between">
        <span @click="${() => page('/')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold mr-8" style="font-family: calibri;">Food2U</span>
        <div class="flex items-center gap-2 cursor-pointer"  @click="${() => page('/login')}">
          <span class="font-semibold">Login as a Supplier</span>
          <iconify-icon icon="material-symbols:login-rounded" class="text-2xl"></iconify-icon>
        </div>
      </nav>
    </header>
    <main>
      <div class="relative h-[85vh]">
        <div class="absolute z-10 text-white h-full lg:w-[55%] w-full flex flex-col justify-center">
          <div class="absolute bg-red-500 h-full lg:w-[80%] w-full left-0 top-0"></div>
          <div class="hidden lg:block absolute bg-red-500 h-full w-96 right-0 top-0 transform skew-x-[-20deg]"></div>
          <div class="relative lg:mr-auto lg:ml-0 mx-auto lg:px-12 px-6">
            <h1 class="text-5xl mb-2 drop-shadow-lg">Shop Local, Support Local</h1>
            <h2 class="text-lg mb-6 drop-shadow-lg">Order food directly from local suppliers</h2>
            <div class="relative">
              <input @input="${(event) => this.userAddress = event.target.value}" type="text" name="search" id="search" class="w-full block p-4 pr-10 rounded-md shadow-sm text-black sm:text-sm" placeholder="Enter your address..." value="${this.userAddress}">
              <span @click="${this.handleSearch}" class="absolute inset-y-0 right-0 flex items-center pr-3 text-2xl text-gray-600 hover:text-black cursor-pointer">
                <iconify-icon icon="material-symbols:send-rounded"></iconify-icon>
              </span>
            </div>
          </div>
        </div>
        <img class="relative -right-24 z-0 ml-auto h-full" src="../src/assets/hero_banner.jpg">
      </div>
    </main>
  `;
  }
}

customElements.define('home-template', HomeView);