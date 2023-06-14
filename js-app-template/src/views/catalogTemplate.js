import page from "page";
import { LitElement, html } from 'lit';
import { TWStyles } from '../../tw.js';

export class CatalogView extends LitElement {

    static properties = {
        products: [],
        cart: {},
        isCartOpen: { type: Boolean }
    };

    static styles = TWStyles;

    constructor(querySnapshot) {
        super();

        this.products = [];
        querySnapshot.forEach((doc) => {
            this.products.push({ id: doc.id, ...doc.data() })
        });

        this.cart = {
            items: [],
            total: 0,
        };
      
        this.isCartOpen = false;
    }

    toggleCart() {
        this.isCartOpen = !this.isCartOpen;
        this.requestUpdate('isCartOpen');
    }
    
    addToCart(item) {
        console.log('Event caught!')
        this.cart.items.push(item);
        this.cart.total += item.Price;
        console.log(this.cart)
        this.requestUpdate('cart');
    }

    itemCatalogTemplate = (doc) => {
        // const distance = calculateDistance(userLocation.coords, doc.Location);

        const distance = 0;
        return html`
            <div class="grid grid-cols-12 bg-white hover:bg-gray-100 h-40 rounded-xl shadow-lg max-w-4xl text-gray-700 cursor-pointer"
                @click="${() => this.addToCart(doc)}">
                <img class="col-span-4 object-cover object-center w-full h-40 rounded-l-xl" src="${doc.ImageURL}">
                <div class="col-span-8 flex flex-col pt-4 pb-2 px-4">
                    <h1 class="text-xl font-semibold mb-2">${doc.Title}</h1>
                    <span class="flex gap-2">
                        <img class="w-8 aspect-square rounded-full object-cover object-center" src="../src/assets/profile.jpg">
                        <p class="font-semibold">Ivan</p>    
                    </span>
                    <span class="flex justify-between mt-auto">
                        <p class="text-xl font-bold">£${doc.Price.toFixed(2)}</p>
                        <div class="flex items-center gap-2">
                            <iconify-icon icon="fa6-solid:location-arrow" class="text-gray-600 text-lg"></iconify-icon> 
                            <p>${distance.toFixed(1)} km away</p>
                        </div>
                    </span>
                </div>
            </div>
        `;
    }

    // function calculateDistance(location1, location2) {
    //     console.log(location1, location2);
    //     const R = 6371; // Radius of the earth in km
    //     const dLat = deg2rad(location2._lat - location1.latitude);
    //     const dLon = deg2rad(location2._long - location1.longitude);
    //     const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2._lat)) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const d = R * c; // Distance in km
    //     return d;
    // }

    // function deg2rad(deg) {
    //     return deg * (Math.PI / 180)
    // }

    render() {
        return html`
            <header class="px-16 py-6">
                <nav class="flex justify-between relative">
                    <span @click="${() => page('/')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
                    <div class="flex items-center gap-2 p-4 cursor-pointer" @click="${() => this.toggleCart()}">
                        <span class="font-semibold">${this.cart.total == 0 ? 'Your cart' : '£' + this.cart.total.toFixed(2)}</span>
                        <iconify-icon icon="material-symbols:shopping-cart" class="text-2xl"></iconify-icon>
                    </div>
                    ${this.isCartOpen ? html`
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
                    ` : ''}
                </nav>
            </header>
            <main>
                <section class="grid grid-cols-12">
                    <aside class="col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] h-screen bg-cover brightness-75 sticky top-0"></aside>
                    <div class="col-start-5 col-span-8 bg-red-500 h-full px-8 py-12 flex flex-col">
                        <h1 class="text-3xl font-bold mb-12 text-white">Showing ${this.products.length} offers in your area</h1>
                        <div class="flex flex-col gap-4">
                            ${this.products.map((doc) => this.itemCatalogTemplate(doc))}
                        </div>
                    </div>
                </section>
            </main> 
        `;
    }
}

customElements.define('catalog-template', CatalogView);

/* <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
<img class="col-span-4 object-cover object-center h-40 rounded-l-xl" src="../src/assets/cheese.jpg">
<div class="col-span-8 flex flex-col pt-4 pb-2 px-4">
    <h1 class="text-xl font-semibold mb-2">Homemade Feta Cheese</h1>
    <span class="flex gap-2">
        <img class="w-8 aspect-square rounded-full object-cover object-center" src="../src/assets/profile.jpg">
        <p class="font-semibold">Ivan</p>    
    </span>
    <span class="flex justify-between mt-auto">
        <p class="text-xl font-bold">£5.00</p>
        <div class="flex items-center gap-2">
            <iconify-icon icon="fa6-solid:location-arrow" class="text-gray-600 text-lg"></iconify-icon> 
            <p>1.5 miles away</p>
        </div>
    </span>
</div>
</div>  */