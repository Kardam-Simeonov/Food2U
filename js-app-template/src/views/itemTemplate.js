async function itemTemplate(html, ctx, doc, getDoc, db) {
    const id = ctx.params.id;

    const docRef = doc(db, "tasks", id);
    const docSnap = await getDoc(docRef);
    let data = {};
    if (docSnap.exists()) {
        data = docSnap.data();
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    return html`
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    `
}

export default itemTemplate;