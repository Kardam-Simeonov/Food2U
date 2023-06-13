import { html } from 'lit-html';
import 'iconify-icon';
import page from 'page';

function catalogLayoutTemplate(content) {
  let cart = {
    items: [],
    total: 0
  };
  
  function handleRedirect(){
    page('/');
  }

  return html`
    <header class="px-16 py-6">
      <nav class="flex justify-between">
        <span @click="${handleRedirect}" class="text-red-700 hover:text-red-500 cursor-pointer text-4xl font-bold" style="font-family: calibri;">Food2U</span>
        <div class="flex items-center gap-2 p-4">
          <span class="font-semibold">${cart.total == 0 ? 'Your cart' : cart.total}</span>
          <iconify-icon icon="material-symbols:shopping-cart" class="text-2xl"></iconify-icon>
        </div>
      </nav>
    </header>
    <main>
      ${content}
    </main>
  `;
}

export default catalogLayoutTemplate;