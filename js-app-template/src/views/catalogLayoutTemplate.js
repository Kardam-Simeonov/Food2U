import { LitElement, html } from 'lit';
import 'iconify-icon';
import page from 'page';
import { TWStyles } from '../../tw.js';

export class CatalogLayoutView extends LitElement {

  static properties = {
    cart: {},
  };

  static styles = TWStyles;

  constructor() {
    super();

    this.cart = {
      items: [
        {
          Title: 'Pizza',
          Price: 10,
          ImageURL: 'https://firebasestorage.googleapis.com/v0/b/food2u-2c5e3.appspot.com/o/Tomatoes-1067x800.jpg?alt=media&token=d278a083-759d-4f52-ba6c-5f47cc2599f2',
        },
      ],
      total: 0,
    };

    this.cart.total = this.cart.items.reduce((acc, item) => acc + item.Price, 0);

    this.addEventListener('add-to-cart', (e) => console.log(e.type, e.target.localName));
  }

  handleAddToCart(event) {
    console.log('Event caught!')
    const item = event.detail.item;
    this.cart.items.push(item);
    this.cart.total += item.Price;
  }

  render() {
    return html`
      <header class="px-16 py-6">
        <nav class="flex justify-between relative">
          <span @click="${() => page('/')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
          <div class="flex items-center gap-2 p-4">
            <span class="font-semibold">${this.cart.total == 0 ? 'Your cart' : '£' + this.cart.total.toFixed(2)}</span>
            <iconify-icon icon="material-symbols:shopping-cart" class="text-2xl"></iconify-icon>
          </div>
          <!-- Popup on the cart, which shows the items in the cart -->
          <div class="absolute z-50 top-16 right-0 bg-white shadow-lg border-2 rounded-lg p-8">
            <div class="flex flex-col gap-2 mb-10">
              ${this.cart.items.map((item) => html`
              <div class="grid grid-cols-12 gap-5 bg-white h-24 rounded-xl max-w-sm text-gray-700">
                <img class="col-span-4 object-cover object-center w-full h-24 rounded-xl" src="${item.ImageURL}">
                <div class="col-span-8 flex flex-col pt-4 pb-2 px-4">
                    <h1 class="text-xl font-semibold mb-2">${item.Title}</h1>
                    <span class="flex justify-end mt-auto">
                        <p class="text-xl font-bold">£${item.Price.toFixed(2)}</p>
                    </span>
                </div>
            </div>
              `)}
            </div>
            <div class="font-bold text-xl text-right w-full">Total: £${this.cart.total.toFixed(2)}</div>
          </div>
        </nav>
      </header>
      <slot></slot>
    `;
  }
}

customElements.define('catalog-layout', CatalogLayoutView);
