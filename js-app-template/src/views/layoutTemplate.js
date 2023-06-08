import { html } from 'lit-html';
import 'iconify-icon';

const layoutTemplate = (content) => html`
  <header class="px-16 py-6">
    <nav class="flex justify-between">
      <img class="w-14" src="./src/assets/Food2U_logo.png" alt="Food2U Logo">
      <div class="flex items-center gap-2">
        <span class="font-semibold">Become a supplier</span>
        <iconify-icon icon="material-symbols:shopping-cart" class="text-2xl"></iconify-icon>
      </div>
    </nav>
  </header>
  <main>
    ${content}
  </main>
`;

export default layoutTemplate;