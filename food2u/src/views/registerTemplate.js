import { LitElement, html } from 'lit-element';
import { TWStyles } from '../../tw.js';
import page from 'page';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getUserCredentials, removeUserCredentials } from '../config/auth.js';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class RegisterView extends LitElement {

  static styles = TWStyles;

  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      username: { type: String },
      profilePicture: { type: Object },
      error: { type: String },
      auth: { type: Object },
      storage: { type: Object },
      db: { type: Object },
    };
  }

  constructor(auth, storage, db) {
    super();
    this.email = '';
    this.password = '';
    this.username = '';
    this.profilePicture = null;
    this.error = '';
    this.auth = auth;
    this.storage = storage;
    this.db = db;
  }

  render() {
    return html`
      <div class="min-h-screen bg-red-500 flex justify-center items-center">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h1 class="text-red-800 text-2xl font-bold mb-8">Food2U | Register</h1>

          <div class="relative h-28 aspect-square mb-6">
              <div class="absolute inset-0 flex justify-center items-center border-dashed border-2 border-red-800">
                  <div class="w-12 aspect-square bg-red-800 rounded-full flex justify-center items-center">
                      <iconify-icon icon="bi:plus" class="text-white text-3xl"></iconify-icon>
                  </div>
              </div>
              <div id="image-preview" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer bg-cover bg-center"></div>
              <input type="file" class="opacity-0 absolute inset-0 w-full h-full cursor-pointer" accept="image/png, image/gif, image/jpeg" @change="${this.handleFileUpload}">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="username">
              Username
            </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="username"
                   type="text"
                   placeholder="Username"
                   @input="${this.handleUsernameInput}">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="email"
                   type="email"
                   placeholder="Email"
                   @input="${this.handleEmailInput}">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="password"
                   type="password"
                   placeholder="Password"
                   @input="${this.handlePasswordInput}">
          </div>
          ${this.error ? html`<p class="text-red-500 text-sm mb-4">${this.error}</p>` : ''}
          <div class="flex items-center justify-between">
            <button class="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    @click="${this.handleRegister}">
              Register
            </button>
          </div>
        </div>
      </div>
    `;
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

  handleUsernameInput(event) {
    this.username = event.target.value;
  }

  handleEmailInput(event) {
    this.email = event.target.value;
  }

  handlePasswordInput(event) {
    this.password = event.target.value;
  }

  handleRegister() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (userCredential) => {
        if (getUserCredentials())
          removeUserCredentials();

        try {
          // Upload image to Firebase Storage
          const imageFile = this.imageInput?.files?.[0];

          const storageRef = ref(this.storage, `images/${userCredential.user.uid}/${imageFile.name}`);
          const snapshot = await uploadBytes(storageRef, imageFile);

          // Get ImageURL of uploaded image
          const imageURL = await getDownloadURL(snapshot.ref);

          // Add product to Firestore
          const productData = {
            Username: this.username,
            Email: this.email,
            ImageURL: imageURL,
            ImageName: imageFile.name,
            VendorUID: userCredential.user.uid,
          };
          await addDoc(collection(this.db, "vendors"), productData);
        } catch (error) {
          console.log(error);
        }

        page('/login'); // Redirect the user to the login page
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}

customElements.define('register-view', RegisterView);