import page from "page";

function catalogTemplate(html, querySnapshot, ctx) {

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

    return html`
    <h1>Catalog Page</h1>
    ${arr.map((doc) => itemCatalogTemplate(doc))}
    `
}

export default catalogTemplate;