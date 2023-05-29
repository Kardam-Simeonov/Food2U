import { html } from 'lit-html';

const layoutTemplate = (content) => html`
  <header class="shadow-lg px-16 py-4">
    <nav class="flex justify-between">
      <img class="w-16" src="./src/assets/Food2U_logo.png" alt="Food2U Logo">
      <div class="flex items-center">
        <span class="font-semibold">Become a supplier</span>
      </div>
    </nav>
  </header>
  <main>
    ${content}
  </main>
  <footer>
    <!-- Footer content goes here -->
  </footer>
`;

export default layoutTemplate;