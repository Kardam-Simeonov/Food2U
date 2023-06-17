import page from "page";
import { LitElement, html } from 'lit';
import { until } from 'lit-html/directives/until.js';
import { TWStyles } from '../../tw.js';
import { getUserCredentials, removeUserCredentials } from '../config/auth.js';
import { doc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Stroke, Fill } from 'ol/style';

export class DashboardView extends LitElement {

    static properties = {
        map: { type: Object },
        db: { type: Object },
        storage: { type: Object },
        products: { type: Array },
        orders: { type: Array },
    };

    static styles = TWStyles;

    constructor(db, storage) {
        super();

        this.map = null;
        this.db = db;
        this.products = [];
        this.orders = [];
        this.storage = storage;
    }

    handleSignOff() {
        removeUserCredentials();
        page('/');
    }

    handleDelete(event) {
        const productIndex = event.target.dataset.index;
        const product = this.products[productIndex];

        // Delete product document from Firestore
        deleteDoc(doc(this.db, "products", product.id));

        // Delete image from Firebase Storage
        const storageRef = ref(this.storage, `images/${getUserCredentials().user.uid}/${product.ImageName}`);
        deleteObject(storageRef);

        // Remove product from products array
        this.products.splice(productIndex, 1);

        // Update products list
        this.requestUpdate('products');
    }

    itemCatalogTemplate = (doc, index) => {
        return html`
          <div class="bg-red-500 rounded-lg p-4 flex flex-col justify-between relative">
            <img src="${doc.ImageURL}" alt="Product Image" class="w-full h-56 object-cover rounded-lg mb-6">
            <h2 class="text-xl font-bold">${doc.Title}</h3>
            <p class="text-lg font-semibold mt-14 mb-4">$${doc.Price.toFixed(2)}</p>
            <button data-index="${index}" @click="${this.handleDelete}" class="absolute bottom-4 right-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Delete</button>
          </div>
        `;
    }

    markOrderAsDelivered(orderId) {
        deleteDoc(doc(this.db, "orders", orderId));
        this.orders = this.orders.filter(order => order.id !== orderId);
        this.requestUpdate('orders');
    }

    itemOrderTemplate = (doc, index) => {
        const addressPromise = fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${doc.lat}&lon=${doc.lon}`)
            .then(response => response.json())
            .then(data => `${data.address.road}, ${data.address.house_number}, ${data.address.city}, ${data.address.postcode}`);

        return html`
            <div class="bg-white shadow-lg rounded-lg p-6 mb-6">
                <div class="font-bold text-xl mb-4">Order #${index + 1}</div>
                ${doc.products.map((product) => html`
                    <div class="flex items-center mb-4">
                        <img src="${product.ImageURL}" alt="${product.ImageName}" class="w-16 h-16 object-cover rounded-lg mr-4">
                        <div>
                            <div class="font-bold">${product.Title}</div>
                            <div class="text-gray-600">$${product.Price}</div>
                        </div>
                    </div>
                `)}
                <p class="font-semibold">Deliver to: ${until(addressPromise, html`<span>Loading...</span>`)}</p>
                <button @click="${() => this.markOrderAsDelivered(doc.id)}" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4">Mark as delivered</button>
            </div>
        `;
    }

    async firstUpdated() {
        super.firstUpdated();

        this.map = new Map({
            target: this.shadowRoot.querySelector('#map'),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([23.3219, 42.6975]),
                zoom: 12
            }),
            controls: [],
        });

        const userCredentials = getUserCredentials();
        const querySnapshot = await getDocs(query(collection(this.db, "products"), where("VendorUID", "==", userCredentials.user.uid)));
        querySnapshot.forEach((doc) => {
            this.products.push({ id: doc.id, ...doc.data() });
        });

        this.requestUpdate('products');

        // Get all orders from Firestore
        const ordersSnapshot = await getDocs(collection(this.db, "orders"));

        // Loop through each order
        ordersSnapshot.forEach((orderDoc) => {
            const orderData = orderDoc.data();


            // Check if the order belongs to the logged in user
            if (orderData.products.some(product => product.VendorUID === userCredentials.user.uid)) {
                const orderProducts = [];

                // Loop through each product in the order
                orderData.products.forEach((product) => {
                    // Check if the product belongs to the logged in user
                    if (product.VendorUID === userCredentials.user.uid) {
                        orderProducts.push({
                            ...product,
                            lat: orderData.lat,
                            lon: orderData.lon,
                        });
                    }

                    // Create a new feature with a circle geometry for the order
                    const feature = new Feature({
                        geometry: new Point(fromLonLat([orderData.lon, orderData.lat])),
                    });

                    // Create a new layer with the feature and add it to the map
                    const layer = new VectorLayer({
                        source: new VectorSource({
                            features: [feature],
                        }),
                    });
                    this.map.addLayer(layer);
                });

                // Add the order to the orders array
                this.orders.push({
                    id: orderDoc.id,
                    products: orderProducts,
                    lat: orderData.lat,
                    lon: orderData.lon,
                });
            }
        });

        this.requestUpdate('orders');
    }

    render() {
        return html`
            <header class="lg:px-16 px-4 py-6">
                <nav class="flex justify-between">
                    <span @click="${() => page('/dashboard')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U | Vendors</span>
                    <div class="flex items-center gap-3 cursor-pointer"  @click="${this.handleSignOff}">
                        <span class="font-semibold text-xl">Logout</span>
                        <iconify-icon icon="material-symbols:login-rounded" class="text-3xl"></iconify-icon>
                    </div>
                </nav>
            </header>
            <main>
                <section class="grid grid-cols-12 xl:h-[90vh]">
                    <div id="map" class="xl:col-span-8 col-span-full xl:h-full h-[50vh]"></div>
                    <aside class="xl:col-span-4 col-span-full bg-red-500 xl:h-full h-[70vh] overflow-y-auto px-8 py-12 flex flex-col">
                        <h1 class="text-4xl text-white font-semibold mb-12">Your orders</h1>
                        ${this.orders.length === 0 ? html`
                            <div class="border-dashed border-4 border-red-800 rounded-lg p-4 flex flex-col justify-center items-center min-h-[15rem]">
                                <p class="text-white text-center">You have no orders</p>
                            </div>
                        ` : html`
                            ${this.orders.map((doc, index) => this.itemOrderTemplate(doc, index))}
                        `}
                            </aside>
                        </section>
                <section class="py-12 text-white">
                    <h1 class="text-4xl font-bold text-center mb-16 text-red-700">Your Products</h1>
                    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 max-w-5xl px-4 mx-auto">
                        ${this.products.map((doc, index) => this.itemCatalogTemplate(doc, index))}
                        <div class="border-dashed border-4 border-red-500 hover:border-red-300 text-red-500 hover:text-red-300 cursor-pointer rounded-lg p-4 flex flex-col justify-center items-center min-h-[23rem]" @click="${() => page('/dashboard/add')}">
                            <iconify-icon icon="bi:plus-circle" class="text-6xl"></iconify-icon>
                        </div>
                    </div>
                </section>
            </main> 
        `;
    }
}

customElements.define('dashboard-template', DashboardView);