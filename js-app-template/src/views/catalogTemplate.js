import page from "page";
import layoutTemplate from '../views/layoutTemplate.js';

function catalogTemplate(html, ctx) {

    // const arr = [];

    // querySnapshot.forEach((doc) => {
    //     arr.push({id: doc.id, ...doc.data()})
    // });

    // function itemDetailsHandler(id) {
    //     return function () {
    //         page.redirect('/catalog/' + id)
    //     }
    // }

    // const itemCatalogTemplate = (doc) => html`
    // <div @click=${itemDetailsHandler(doc.id)} id=${doc.id}>
    //     <h2>${doc.title}</h2>
    //     <p>${doc.description}</p>
    // </div>
    // `

    // return html`
    // <h1>Catalog Page</h1>
    // ${arr.map((doc) => itemCatalogTemplate(doc))}
    // `

    return layoutTemplate(html`
    <section class="grid grid-cols-12 min-h-screen">
        <div class="col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] bg-cover brightness-75"></div>
        <div class="col-span-8 bg-red-500 h-full px-8 py-12 flex flex-col">
            <h1 class="text-3xl font-bold mb-12 text-white">Showing 102 results</h1>
            <div class="grid grid-cols-12 bg-white h-40 rounded-xl shadow-lg">
                <img class="col-span-4 object-cover object-center h-40 rounded-xl" src="../src/assets/cheese.jpg">
            </div>
        </div>
    </section>
    `);
}

export default catalogTemplate;