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
function setupActionButtons() {
  const authToken = localStorage.getItem('authToken');
  const headerAuth = document.querySelector('.header_button');

  if (authToken && headerAuth) {
    headerAuth.textContent = 'Выйти';
    headerAuth.style.backgroundColor = '#C1121F';
    headerAuth.style.padding = '10px 20px';
    headerAuth.style.color = '#FFFFFF';
    headerAuth.style.borderRadius = '8px';
    headerAuth.style.border = 'none';
    headerAuth.style.cursor = 'pointer';

    headerAuth.removeAttribute('href'); 
    headerAuth.addEventListener('click', logout);

    displayCreateButton(); 
  }
}
function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '../auth/auth.html'; 
}

document.addEventListener('DOMContentLoaded', setupActionButtons);


document.addEventListener("DOMContentLoaded", fetchAndRenderCategories);
