import page from 'page';
import { html } from 'lit-html';
import 'iconify-icon';

function layoutTemplate(content) {

  function handleRedirect(){
    page('/');
  }

  return html`
    <header class="px-16 py-6">
      <nav class="flex justify-between">
        <span @click="${handleRedirect}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
        <div class="flex items-center gap-2">
          <span class="font-semibold">Become a supplier</span>
          <iconify-icon icon="material-symbols:shopping-cart" class="text-2xl"></iconify-icon>
        </div>
      </nav>
    </header>
    <main class="relative">
      ${content}
    </main>
  `;
}

export default layoutTemplate;