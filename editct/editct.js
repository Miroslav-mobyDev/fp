const BASE_URL = "https://webfinalapi.mobydev.kz/";

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
  }
}

function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '../auth/auth.html';
}

// Функция для получения id из URL-параметров
function getCategoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Функция для загрузки данных о категории
async function loadCategoryData(categoryId) {
  try {
    const response = await fetch(`${BASE_URL}categories/${categoryId}`);
    if (!response.ok) throw new Error('Ошибка загрузки категории');

    const category = await response.json();
    document.querySelector('.create_input').value = category.name || '';
  } catch (error) {
    console.error('Ошибка при получении данных категории:', error);
    alert('Не удалось загрузить данные категории');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setupActionButtons();

  const categoryId = getCategoryIdFromUrl();
  if (!categoryId) {
    alert('ID категории не найден');
    window.location.href = '../categories/categories.html';
    return;
  }

  await loadCategoryData(categoryId);

  const form = document.querySelector('.create_new');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken');
    const title = document.querySelector('.create_input').value.trim();

    if (!title) {
      alert('Заполните поле');
      return;
    }

    const categoryData = { name: title };

    try {
      const response = await fetch(`${BASE_URL}category/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      if (response.ok) {
        alert('Категория обновлена');
        window.location.href = '../categories/categories.html';
      } else {
        const errorData = await response.json();
        console.error('Ошибка от сервера:', errorData);
        alert('Ошибка при обновлении категории');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Ошибка при отправке данных');
    }
  });
});
