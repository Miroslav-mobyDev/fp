function setupActionButtons() {
    const authToken = localStorage.getItem('authToken');
    const headerAuth = document.querySelector('.header_button');
  
    if (authToken && headerAuth) {
      headerAuth.textContent = 'Выйти';
      headerAuth.style.backgroundColor = '#C1121F';
      headerAuth.style.color = '#FFFFFF';
      headerAuth.style.padding = '10px 20px';
      headerAuth.style.border = 'none';
      headerAuth.style.borderRadius = '8px';
      headerAuth.style.cursor = 'pointer';
  
      headerAuth.removeAttribute('href');
      headerAuth.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = '../auth/auth.html';
      });
    }
  }
  
  setupActionButtons();
  
  document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
  
    if (!newsId) {
      alert('ID новости не найден в URL');
      return;
    }
  
    const titleInput = document.querySelector('.create_input');
    const contentInput = document.querySelector('.create_input_content');
    const categorySelect = document.querySelector('#category');
    const fileInput = document.querySelector('#thumbnail');
    const fileName = document.querySelector('.file-name');
    const form = document.querySelector('.create_new');
  
    // Загружаем категории (если нужно)
    try {
      const catRes = await fetch('https://webfinalapi.mobydev.kz/categories');
      if (catRes.ok) {
        const categories = await catRes.json();
        categorySelect.innerHTML = categories.map(cat => `
          <option value="${cat.id}">${cat.name}</option>
        `).join('');
      }
    } catch (e) {
      console.warn('Не удалось загрузить категории');
    }
  
    // Загружаем новость
    try {
      const response = await fetch(`https://webfinalapi.mobydev.kz/news/${newsId}`);
      if (response.ok) {
        const newsData = await response.json();
        titleInput.value = newsData.title;
        contentInput.value = newsData.content;
        if (newsData.categoryId) {
          categorySelect.value = newsData.categoryId.toString();
        }
      } else {
        alert('Не удалось загрузить новость');
      }
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    }
  
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        fileName.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'Не выбран файл';
      });
    }
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('Вы не авторизованы!');
        return;
      }
  
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      const categoryId = categorySelect.value;
      const thumbnail = fileInput.files[0];
  
      if (!title || !content || !categoryId) {
        alert('Заполните все поля!');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('categoryId', categoryId);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
  
      try {
        const response = await fetch(`https://webfinalapi.mobydev.kz/news/${newsId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
          body: formData
        });
  
        if (response.ok) {
           alert('Новость успешно обновлена!');
           window.location.href = `../news/newsin.html?id=${newsId}`;
            console.log('Новость обновлена')
        } else {
          const errorText = await response.text();
          console.error('Ошибка от сервера:', errorText);
          alert('Ошибка при обновлении новости');
        }
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при отправке данных.');
      }
    });
  });
  