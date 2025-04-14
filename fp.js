const BASE_URL = "https://webfinalapi.mobydev.kz/";

async function fetchAndRenderNews() {
  try {
    const response = await fetch(`${BASE_URL}news`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const newsArray = await response.json();

    document.querySelector('.news_list').innerHTML = newsArray.map(news => `
      <li class="new">
        <img src="${news.thumbnail }" alt="Превью">
        <div class="new_main_content">
          <h1>${news.title}</h1>
          <p>${news.createdAt} • ${news.category?.name || 'Без категории'}</p>
          <div class="news_status">
            <img class="admin_logo" src="./adminlogo.svg">
            <p class="status">${news.author?.name || 'Автор неизвестен'}</p>
          </div>
          <div class="news_buttons">
            <button class="news_button1">Редактировать</button>
            <button class="news_button2">Удалить</button>
          </div>
        </div>
      </li>
    `).join('');
  } catch (error) {
    console.error("Ошибка запроса", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderNews);