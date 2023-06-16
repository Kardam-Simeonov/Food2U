import {html, render} from 'lit'
import page from 'page';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

import firebaseConfig from './src/config/firebase';
import { getUserCredentials } from './src/config/auth.js';

import { HomeView } from './src/views/homeTemplate';
import { CatalogView } from './src/views/catalogTemplate';
import { LoginView } from './src/views/loginTemplate';
import { RegisterView } from './src/views/registerTemplate';
import { DashboardView } from './src/views/dashboardTemplate';
import { AddProductView } from './src/views/addProductTemplate';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 
const storage = getStorage(app);

page('/', () => render(new HomeView(), document.body));
page('/catalog', (ctx) => {
  render(new CatalogView(db, ctx), document.body);
});
page('/login', () => {
  const userCredentials = getUserCredentials();
  if (userCredentials) {
    page.redirect('/dashboard')
  } else {
    render(new LoginView(auth), document.body);
  }
});
page('/register', () => render(new RegisterView(auth, storage, db), document.body));
page('/dashboard', () => {
  const userCredentials = getUserCredentials();
  if (userCredentials) {
    render(new DashboardView(db, storage), document.body);
  } else {
    page.redirect('/login');
  }
});
page('/dashboard/add', () => {
  const userCredentials = getUserCredentials();
  if (userCredentials) {
    render(new AddProductView(db, storage), document.body);
  } else {
    page.redirect('/login');
  }
});
page();


/*/
I would like to now brief you on what the application I am building is about. 
Remember this from now on:
The application is called Food2U. Food2U is a website, which allows users to register and order food products from local vendors. 
A user would be able see a list or a map of the available vendors in their area, who sell local food product. 
A food vendor would also be able to register into the site, specifying the fact that they are a vendor. 
A vendor is able to log in, manage their stock, including adding or removing items and also see any orders they have from other users in the app.
/*/