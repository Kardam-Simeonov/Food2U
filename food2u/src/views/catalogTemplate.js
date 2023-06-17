import page from "page";
import { LitElement, html } from 'lit';
import { until } from 'lit-html/directives/until.js';
import { TWStyles } from '../../tw.js';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export class CatalogView extends LitElement {

    static properties = {
        products: [],
        cart: {},
        isCartOpen: { type: Boolean },
        db: { type: Object },
        lon: { type: Number },
        lat: { type: Number },
    };

    static styles = TWStyles;

    constructor(db, ctx) {
        super();

        this.db = db;

        this.cart = {
            items: [],
            total: 0,
        };

        this.products = [];
        this.isCartOpen = false;

        const query = ctx.querystring.split('&');
        this.lat = Number(query[0].split('=')[1]);
        this.lon = Number(query[1].split('=')[1]);
    }

    itemCatalogTemplate = (doc) => {
        const vendorPromise = getDocs(query(collection(this.db, 'vendors'), where('VendorUID', '==', doc.VendorUID)))
            .then((querySnapshot) => {
                const vendorDoc = querySnapshot.docs[0];
                return vendorDoc.data();
            });

        return html`
            <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
                <img class="col-span-4 object-cover object-center w-full h-40 rounded-l-xl" src="${doc.ImageURL}">
                <div class="col-span-8 flex flex-col pt-4 pb-2 px-4">
                    <h1 class="text-xl font-semibold mb-2">${doc.Title}</h1>
                    <span class="flex gap-2">
                    ${until(
                        vendorPromise.then((vendorData) => html`
                        <img class="w-8 aspect-square rounded-full object-cover object-center" src="${vendorData.ImageURL}">
                        <p class="font-semibold">${vendorData.Username}</p>
                        `),
                        html`<p>Loading...</p>`
                    )}   
                    </span>
                    <span class="flex justify-between mt-auto">
                        <p class="text-xl font-bold">$${doc.Price.toFixed(2)}</p>
                        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                                @click="${() => this.addToCart(doc)}">Add to cart</button>
                    </span>
                </div>
            </div>
        `;
    }

    async firstUpdated() {
        super.firstUpdated();

        const querySnapshot = await getDocs(collection(this.db, "products"));
        querySnapshot.forEach((doc) => {
            this.products.push(doc.data());
        });

        this.requestUpdate('products');
    }

    toggleCart() {
        if (this.cart.items.length === 0) {
            return;
        }

        this.isCartOpen = !this.isCartOpen;
        this.requestUpdate('isCartOpen');
    }

    addToCart(item) {
        this.cart.items.push(item);
        this.cart.total += item.Price;

        console.log(this.cart);
        this.requestUpdate('cart');
    }

    async handleCheckout() {
        console.log(this.lon);
        console.log(this.lat);

        const order = {
            products: this.cart.items,
            lon: this.lon,
            lat: this.lat,
        };

        try {
            const docRef = await addDoc(collection(this.db, "orders"), order);
            console.log("Order written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding order: ", e);
        }

        this.cart.items = [];
        this.cart.total = 0;
        this.isCartOpen = false;
        this.requestUpdate('cart');
    }

    render() {
        return html`
            <header class="lg:px-16 px-4 py-6">
                <nav class="flex justify-between relative">
                    <span @click="${() => page('/')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
                    <div class="flex items-center gap-2 p-4 cursor-pointer" @click="${() => this.toggleCart()}">
                        <span class="font-semibold">${this.cart.total == 0 ? 'Your cart' : '$' + this.cart.total.toFixed(2)}</span>
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
                                        <p class="text-xl font-bold">$${item.Price.toFixed(2)}</p>
                                    </span>
                                </div>
                            </div>
                            `)}
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="font-bold text-xl w-full">Total: $${this.cart.total.toFixed(2)}</div>
                                <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                                        @click="${() => this.handleCheckout()}">Checkout</button>
                            </div>
                        </div>
                    ` : ''}
                </nav>
            </header>
            <main>
                <section class="grid grid-cols-12">
                    <aside class="lg:block hidden col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] h-screen bg-cover brightness-75 sticky top-0"></aside>
                    <div class="lg:col-span-8 col-span-full bg-red-500 h-screen px-8 py-12 flex flex-col">
                        <h1 class="text-3xl font-bold mb-12 text-white">Showing ${this.products.length} offer${this.products.length > 1 ? 's' : ''} in your area</h1>
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