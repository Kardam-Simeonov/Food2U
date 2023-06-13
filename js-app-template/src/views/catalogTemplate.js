import page from "page";
import catalogLayoutTemplate from '../views/catalogLayoutTemplate.js';

function catalogTemplate(html, ctx, querySnapshot) {

    if (userLocation == null) {
        page('/');
    }

    const arr = [];

    querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() })
    });

    function itemDetailsHandler(id) {
        return function () {
            page('/catalog/' + id)
        }
    }

    const itemCatalogTemplate = (doc) => {
        const distance = calculateDistance(userLocation.coords, doc.Location);
        return html`
            <div class="grid grid-cols-12 bg-white hover:bg-gray-100 h-40 rounded-xl shadow-lg max-w-4xl text-gray-700 cursor-pointer" @click=${itemDetailsHandler(doc.id)} id=${doc.id}>
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

    function calculateDistance(location1, location2) {
        console.log(location1, location2);
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(location2._lat - location1.latitude);
        const dLon = deg2rad(location2._long - location1.longitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2._lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    return catalogLayoutTemplate(html`
    <section class="grid grid-cols-12">
        <aside class="col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] h-screen bg-cover brightness-75 sticky top-0"></aside>
        <div class="col-start-5 col-span-8 bg-red-500 h-full px-8 py-12 flex flex-col">
            <h1 class="text-3xl font-bold mb-12 text-white">Showing ${arr.length} offers in your area</h1>
            <div class="flex flex-col gap-4">
                <!-- <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div> -->
                ${arr.map((doc) => itemCatalogTemplate(doc))}
            </div>
        </div>
    </section>
    `);
}

export default catalogTemplate;