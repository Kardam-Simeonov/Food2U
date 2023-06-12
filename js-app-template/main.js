import {html, render} from 'lit-html'
import page from 'page';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
// import {  } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

import firebaseConfig from './src/config/firebase';

import homeTemplate from './src/views/homeTemplate';
import loginTemplate from './src/views/loginTemplate';
import registerTemplate from './src/views/registerTemplate';
import catalogTemplate from './src/views/catalogTemplate';
import itemTemplate from './src/views/itemTemplate';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "products"));

const userLocation = await getLocation();

function getLocation() {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

page('/', () => render(homeTemplate(html), document.body));
page('/login', () => render(loginTemplate(html), document.body));
page('/register', () => render(registerTemplate(html), document.body));
page('/catalog', (ctx) => render(catalogTemplate(html, ctx, querySnapshot, userLocation), document.body));
page('/catalog/:id', async (ctx) => render(await itemTemplate(html, ctx, doc, getDoc, db), document.body));
page();

/*/
I would like to now brief you on what the application I am building is about. 
Remember this from now on:
The application is called Food2U. Food2U is a website, which allows users to register and order food products from local vendors. 
A user would be able see a list or a map of the available vendors in their area, who sell local food product. 
A food vendor would also be able to register into the site, specifying the fact that they are a vendor. 
A vendor is able to log in, manage their stock, including adding or removing items and also see any orders they have from other users in the app.
/*/