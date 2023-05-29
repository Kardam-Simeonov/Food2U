import {html, render} from 'lit-html'
import page from 'page';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {  } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

import firebaseConfig from './src/config/firebase';

import homeTemplate from './src/views/homeTemplate';
import aboutTemplate from './src/views/aboutTemplte';
import loginTemplate from './src/views/loginTemplate';
import registerTemplate from './src/views/registerTemplate';
import catalogTemplate from './src/views/catalogTemplate';
import itemTemplate from './src/views/itemTemplate';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const querySnapshot = await getDocs(collection(db, "tasks"));

page('/', () => render(homeTemplate(html), document.body))
page('/about', () => render(aboutTemplate(html), document.body))
page('/login', () => render(loginTemplate(html), document.body))
page('/register', () => render(registerTemplate(html), document.body))
page('/catalog', (ctx) => render(catalogTemplate(html, querySnapshot, ctx), document.body))
page('/catalog/:id', async (ctx) => render(await itemTemplate(html, ctx, doc, getDoc, db), document.body))
page()