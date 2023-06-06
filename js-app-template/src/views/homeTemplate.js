import { html } from 'lit-html';
import layoutTemplate from '../views/layoutTemplate.js';
import 'iconify-icon';

const homeTemplate = () => layoutTemplate(html`
  <div class="relative">
    <div class="absolute z-10 text-white h-[34rem] w-[55%] flex flex-col justify-center">
      <div class="absolute bg-red-500 h-full w-[80%] w-96 left-0 top-0"></div>
      <div class="absolute bg-red-500 h-full w-96 right-0 top-0 transform skew-x-[-20deg]"></div>
      <div class="pl-12 relative">
        <h1 class="text-5xl mb-2 drop-shadow-lg">Shop Local, Support Local</h1>
        <h2 class="text-lg mb-6 drop-shadow-lg">Order food directly from local suppliers</h2>
        <div class="relative w-2/3">
          <input type="text" name="search" id="search" class="w-full block p-4 pr-10 rounded-md shadow-sm text-black sm:text-sm" placeholder="Enter your location...">
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-2xl text-gray-600 hover:text-black cursor-pointer">
            <iconify-icon icon="material-symbols:send-rounded"></iconify-icon>
          </span>
        </div>
      </div>
    </div>
    <img class="relative -right-24 z-0 ml-auto h-[34rem]" src="../src/assets/hero_banner.jpg">
  </div>
`);

export default homeTemplate;