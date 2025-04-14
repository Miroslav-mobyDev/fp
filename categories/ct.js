const BASE_URL = "https://webfinalapi.mobydev.kz/";

async function fetchAndRenderCategories() {
  try {
    const response = await fetch(`${BASE_URL}categories`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const categoriesArray = await response.json();

    document.querySelector('.ct_list').innerHTML = categoriesArray.map(category => `
      <li class="ct_el">
        <h1>${category.name}</h1>
        <div class="ct_buttons">
          <button class="ct_btn1">Редактировать</button>
          <button class="ct_btn2">Удалить</button>
        </div>
      </li>
    `).join('');
  } catch (error) {
    console.error("Ошибка запроса", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderCategories);
