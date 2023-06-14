import { LitElement, html } from 'lit-element';
import { TWStyles } from '../../tw.js';
import page from 'page';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUserCredentials } from '../config/auth.js';

export class LoginView extends LitElement {

  static styles = TWStyles;

  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      error: { type: String },
      auth: { type: Object }, // Define the auth property
    };
  }

  constructor({ auth }) {
    super();
    this.email = '';
    this.password = '';
    this.error = '';
    this.auth = auth;
  }

  render() {
    return html`
      <div class="min-h-screen bg-red-500 flex justify-center items-center">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h1 class="text-red-800 text-2xl font-bold mb-4">Food2U | Login</h1>
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
          <div class="mb-6">
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
                    @click="${this.handleLogin}">
              Login
            </button>
          </div>
        </div>
      </div>
    `;
  }

  handleEmailInput(event) {
    this.email = event.target.value;
  }

  handlePasswordInput(event) {
    this.password = event.target.value;
  }

  handleLogin() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        page('/dashboard');
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}

customElements.define('login-view', LoginView);