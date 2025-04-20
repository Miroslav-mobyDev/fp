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
  
  setupActionButtons();
  
  document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
  
    if (newsId) {
      try {
        const response = await fetch(`https://webfinalapi.mobydev.kz/news/${newsId}`);
        if (response.ok) {
          const newsData = response.json();
  
          document.querySelector('.create_input').value = newsData.title;
          document.querySelector('.create_input_content').value = newsData.content;
          document.querySelector('.custom-select').value = newsData.content;
        } else {
          alert('Ошибка при редактировании');
        }
      } catch {
        console.error('Ошибка', error);
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      setupActionButtons();
  
      const fileInput = document.querySelector('#thumbnail');
      const fileName = document.querySelector('.file-name');
      if (fileInput) {
        fileInput.addEventListener('change', () => {
          fileName.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'Не выбран файл';
        });
      }
  
      const form = document.querySelector('.create_new');
  
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const authToken = localStorage.getItem('authToken');
  
        const title = document.querySelector('.create_input').value.trim();
        const content = document.querySelector('.create_input_content').value.trim();
        const categoryId = document.querySelector('.custom-select').value;
        const thumbnail = document.querySelector('#thumbnail').files[0];
  
        if (!title || !content || !categoryId || !thumbnail) {
          alert('Заполните все поля');
          return;
        }
  
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('categoryId', parseInt(categoryId));
        formData.append('thumbnail', thumbnail);
  
        try {
          const response = await fetch(`https://webfinalapi.mobydev.kz/news/${newsId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
            body: formData
          });
  
          if (response.ok) {
            alert('Новость добавлена');
            window.location.href = '../fp.html';
          } else {
            const errorData = await response.json();
            console.error('Ошибка от сервера:', errorData);
            alert('Ошибка при создании новости');
          }
        } catch (error) {
          console.error('Ошибка сети:', error);
          alert('Ошибка при отправке данных');
        }
      });
    });
  });
  