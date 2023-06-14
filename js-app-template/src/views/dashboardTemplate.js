import page from "page";
import { LitElement, html } from 'lit';
import { TWStyles } from '../../tw.js';

export class DashboardView extends LitElement {

    static properties = {
    };

    static styles = TWStyles;

    render() {
        return html`
            <header class="px-16 py-6">
                <nav class="flex justify-between">
                    <span @click="${() => page('/')}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
                    <div class="flex items-center gap-2">
                    <span class="font-semibold">Hello, Ivan</span>
                    <iconify-icon icon="material-symbols:login-rounded" class="text-2xl"></iconify-icon>
                    </div>
                </nav>
            </header>
            <main>
                <section class="grid grid-cols-12">
                    <aside class="col-span-4 bg-[url('../src/assets/catalog_banner.jpg')] h-screen bg-cover brightness-75 sticky top-0"></aside>
                    <div class="col-start-5 col-span-8 bg-red-500 h-full px-8 py-12 flex flex-col">
                        
                    </div>
                </section>
            </main> 
        `;
    }
}

customElements.define('dashboard-template', DashboardView);
