const BASE_URL = "https://webfinalapi.mobydev.kz/";

async function fetchAndRenderCategories() {
  try {
    const response = await fetch(`${BASE_URL}categories`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const categoriesArray = await response.json();

    categoriesArray.forEach(category => {
      console.log(category);  
    });

    document.querySelector('.ct_list').innerHTML = categoriesArray.map(category => `
      <li class="ct_el">
        <h1>${category.name || 'Без названия'}</h1>
        <div class="ct_buttons">
          <a href="../editct/editct.html?id=${category.id}" class="ct_btn1">Редактировать</a>
          <button class="ct_btn2" data-id="${category.id}">Удалить</button>
        </div>
      </li>
    `).join('');

    setupDeleteButtons(); 
  } catch (error) {
    console.error("Ошибка запроса", error);
  }
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.ct_btn2');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const categoryId = button.getAttribute('data-id');
      const authToken = localStorage.getItem('authToken');

      if (!confirm('Удалить эту категорию?')) return;

      try {
        const response = await fetch(`${BASE_URL}category/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.ok) {
          alert('Категория удалена');
          fetchAndRenderCategories(); 
        } else {
          const errorData = await response.json();
          console.error('Ошибка удаления:', errorData);
          alert('Не удалось удалить категорию');
        }
      } catch (error) {
        console.error('Ошибка сети при удалении:', error);
        alert('Ошибка удаления');
      }
    });
  });
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
      window.location.href = '../createct/cretaect.html'; 
    };

    
    document.body.appendChild(createButton);
  }
}


document.addEventListener('DOMContentLoaded', setupActionButtons);


document.addEventListener("DOMContentLoaded", fetchAndRenderCategories);
