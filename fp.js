const BASE_URL = "https://webfinalapi.mobydev.kz/";

async function fetchAndRenderNews() {
  try {
    const response = await fetch(`${BASE_URL}news`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const newsArray = await response.json();

    document.querySelector('.news_list').innerHTML = newsArray.map(news => `
      <li class="new">
        <a href="./news/newsin.html?id=${news.id}" class="news_link" style="text-decoration: none; color: inherit;">
          <img src="${news.thumbnail}" alt="Превью">
          <div class="new_main_content">
            <h1>${news.title}</h1>
            <p>${news.createdAt} • ${news.category?.name || 'Без категории'}</p>
            <div class="news_status">
              <img class="admin_logo" src="./img/adminlogo.svg">
              <p class="status">${news.author?.name || 'Автор неизвестен'}</p>
            </div>
          </div>
        </a>
        <div class="news_buttons">
          <a class="news_button1" href="./edit/edit.html">Редактировать</a>
          <a class="news_button2">Удалить</a>
        </div>
      </li>
    `).join('');
    setupActionButtons();
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
  window.location.href = './fp.html'; 
}

function displayCreateButton(){
  const existingButton = document.querySelector('.createButton');
  if (!existingButton) { 
    const createButton = document.createElement('button');
    createButton.className = "createButton";
    createButton.textContent = '+';
    
  
    createButton.style.backgroundColor = "green";
    createButton.style.color = "#fff";
    createButton.style.fontSize = "32px";
    createButton.style.width = "60px";
    createButton.style.height = "60px";
    createButton.style.borderRadius = "50%";
    createButton.style.border = "none";
    createButton.style.position = "fixed";
    createButton.style.bottom = "30px";
    createButton.style.right = "30px";
    createButton.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    createButton.style.cursor = "pointer";
    createButton.title = "Создать новость";

    
    createButton.onclick = () => {
      window.location.href = './create/create.html'; 
    };

    
    document.body.appendChild(createButton);
  }
}


document.addEventListener('DOMContentLoaded', setupActionButtons);






document.addEventListener("DOMContentLoaded", fetchAndRenderNews);



