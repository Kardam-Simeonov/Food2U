import page from "page";
import layoutTemplate from '../views/layoutTemplate.js';

function catalogTemplate(html, ctx, querySnapshot) {

    const arr = [];

    querySnapshot.forEach((doc) => {
        arr.push({id: doc.id, ...doc.data()})
    });

    function itemDetailsHandler(id) {
        return function () {
            page.redirect('/catalog/' + id)
        }
    }

    const itemCatalogTemplate = (doc) => html`
    <div @click=${itemDetailsHandler(doc.id)} id=${doc.id}>
        <h2>${doc.title}</h2>
        <p>${doc.description}</p>
    </div>
    `
    
    // return html`
    // <h1>Catalog Page</h1>
    // ${arr.map((doc) => itemCatalogTemplate(doc))}
    // `

    return layoutTemplate(html`
    <section class="grid grid-cols-12">
        <aside class="col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] h-screen bg-cover brightness-75 sticky top-0"></aside>
        <div class="col-start-5 col-span-8 bg-red-500 h-full px-8 py-12 flex flex-col">
            <h1 class="text-3xl font-bold mb-12 text-white">Showing 32 offers in your area</h1>
            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
                <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg max-w-4xl text-gray-700">
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
                </div>
            </div>
        </div>
    </section>
    `);
}

export default catalogTemplate;