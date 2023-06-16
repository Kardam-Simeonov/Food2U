import page from "page";
import { LitElement, html } from 'lit';
import { TWStyles } from '../../tw.js';
import { getUserCredentials, removeUserCredentials } from '../config/auth.js';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class AddProductView extends LitElement {

  static properties = {
    db: { type: Object },
    storage: { type: Object },
    titleInput: { type: Object },
    priceInput: { type: Object },
    imageInput: { type: Object },
    errorMessage: { type: String },
  };

  static styles = TWStyles;

  constructor(db, storage) {
    super();

    this.db = db;
    this.storage = storage;
    this.titleInput = null;
    this.priceInput = null;
    this.imageInput = null;
    this.errorMessage = '';
  }

  handleSignOff() {
    removeUserCredentials();
    page('/');
  }

  itemCatalogTemplate = (doc) => {
    return html`
            <div class="bg-red-500 rounded-lg p-4 flex flex-col justify-between">
                <img src="${doc.ImageURL}" alt="Product Image" class="w-full h-56 object-cover rounded-lg mb-6">
                <h2 class="text-xl font-bold">${doc.Title}</h3>
                <p class="text-lg font-semibold mt-14 mb-4">$${doc.Price.toFixed(2)}</p>
            </div>
        `;
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const userCredentials = getUserCredentials();
    const title = this.titleInput?.value;
    const price = parseFloat(this.priceInput?.value);
    const imageFile = this.imageInput?.files?.[0];

    // Validate form fields
    let errorMessage = '';
    if (!title || title.length > 50) {
      errorMessage = 'Please enter a title with a maximum of 50 characters.';
    } else if (isNaN(price) || price <= 0) {
      errorMessage = 'Please enter a valid price.';
    } else if (!imageFile || !imageFile.type?.startsWith('image/')) {
      errorMessage = 'Please select an image file.';
    }

    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(this.storage, `images/${userCredentials.user.uid}/${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);

      // Get ImageURL of uploaded image
      const imageURL = await getDownloadURL(snapshot.ref);

      // Add product to Firestore
      const productData = {
        Title: title,
        Price: price,
        ImageURL: imageURL,
        ImageName: imageFile.name,
        VendorUID: userCredentials.user.uid,
      };
      await addDoc(collection(this.db, "products"), productData);

      // Redirect to dashboard
      page('/dashboard');
    } catch (error) {
      this.errorMessage = error.message; // set error message
    }
  }

  handleFileUpload(event) {
    this.imageInput = event.target;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imagePreview = this.shadowRoot.querySelector('#image-preview');
      imagePreview.style.backgroundImage = `url(${event.target.result})`;
      imagePreview.classList.remove('opacity-0');
    };
    reader.readAsDataURL(this.imageInput.files[0]);

    console.log(this.imageInput);
  }
  render() {
    return html`
            <header class="px-16 py-6">
                <nav class="flex justify-between">
                    <span @click="${() => page('/dashboard')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U | Vendors</span>
                    <div class="flex items-center gap-5">
                        <span class="font-semibold text-xl">Hello, Ivan</span>
                        <iconify-icon icon="material-symbols:login-rounded" class="text-3xl cursor-pointer" @click="${this.handleSignOff}"></iconify-icon>
                    </div>
                </nav>
            </header>
            <section class="bg-red-500 min-h-screen flex justify-center items-center">
                <div class="bg-white rounded-lg p-4 flex flex-col justify-between w-96">
                    <form @submit="${this.handleFormSubmit}">
                        <div class="relative w-full h-56 mb-6">
                            <div class="absolute inset-0 flex justify-center items-center border-dashed border-2 border-red-800">
                                <div class="w-16 h-16 bg-red-800 rounded-full flex justify-center items-center">
                                    <iconify-icon icon="bi:plus" class="text-white text-3xl"></iconify-icon>
                                </div>
                            </div>
                            <div id="image-preview" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer bg-cover bg-center"></div>
                            <input type="file" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer" accept="image/png, image/gif, image/jpeg" @change="${this.handleFileUpload}">
                        </div>
                        <input type="text" class="text-xl font-bold mb-8" placeholder="Product Title" @input="${(event) => this.titleInput = event.target}">
                        <div class="relative mb-8">
                            <input type="number" class="text-lg font-semibold pl-8 w-28" placeholder="Price" @input="${(event) => this.priceInput = event.target}" step=".01">
                            <span class="absolute top-0 left-0 flex items-center pl-3 text-gray-600 font-semibold text-lg">$</span>
                        </div>
                        <button type="submit" class="bg-red-700 text-white py-2 rounded-lg w-32">Submit</button>
                        <p class="text-red-500 mt-2">${this.errorMessage}</p> 
                    </form>
                </div>
            </section>
        `;
  }
}

customElements.define('add-product-template', AddProductView);