import page from "page";
import catalogLayoutTemplate from '../views/catalogLayoutTemplate.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { Style } from 'ol/style';

async function itemTemplate(html, ctx, doc, getDoc, db) {
    const id = ctx.params.id;

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    let data = {};

    if (docSnap.exists()) {
        data = docSnap.data();
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }

    function handleShowMore() {
        const description = document.querySelector('#description');
        const showMoreButton = document.querySelector('#show-more');
        const isTruncated = description.textContent.endsWith('...');

        if (isTruncated) {
            description.textContent = data.Description;
            showMoreButton.textContent = 'Show less';
        } else {
            description.textContent = truncate(data.Description, 220, '...');
            showMoreButton.textContent = 'Show more';
        }
    }

    function truncate(text, length, suffix) {
        if (text.length > length) {
            const trimmedString = text.substring(0, length)
            return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + suffix
        } else {
            return text
        }
    }

    console.log(data.Location);

    const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([50, 50]),
          zoom: 15,
        }),
    });

    const marker = new VectorLayer({
        source: new VectorSource({
            features: [
            new Feature({
                geometry: new Point(fromLonLat([50, 50])),
            }),
            ],
        }),
        style: new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({
                color: 'white',
              }),
              stroke: new Stroke({
                color: 'black',
                width: 2,
              }),
            }),
        }),
    });
    
    map.addLayer(marker);

    return catalogLayoutTemplate(html`
    <div id="map" class="h-[40vh] w-full relative z-10"></div>
    <section class="bg-red-500 py-16 min-h-[70vh] text-white">
        <div class="grid grid-cols-12 gap-10 max-w-[65rem] mx-auto">
            <img class="col-span-5 object-cover object-center aspect-square w-full h-64 rounded-lg" src="${data.ImageURL}">
            <div class="col-span-7 h-full flex flex-col">
                <h1 class="text-4xl mb-4">${data.Title}</h1>
                <span class="flex gap-2 mb-6">
                    <img class="w-8 aspect-square rounded-full object-cover object-center" src="../src/assets/profile.jpg">
                    <p class="font-semibold">Ivan</p>    
                </span>
                <p id="description">${data.Description.length > 30 ? truncate(data.Description, 220, '...') : data.Description}</p>
                ${data.Description.length > 30 ? html`<button id="show-more" @click="${handleShowMore}" class="font-semibold mt-1 w-fit">Show more</button>` : ''}
                <span class="font-bold text-2xl mt-6 flex justify-between">
                    <p>£${data.Price.toFixed(2)}</p>
                    <button class="bg-white text-gray-600 border-2 border-gray-300 px-4 py-2 rounded-lg mt-4 shadow-lg text-xl">Add to cart</button>
                </span>
            </div>
        </div>
    </section>
    `);
}

export default itemTemplate;