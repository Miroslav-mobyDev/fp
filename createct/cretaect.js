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
  
  document.addEventListener('DOMContentLoaded', () => {
    setupActionButtons();
  
    const form = document.querySelector('.create_new');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const authToken = localStorage.getItem('authToken');
  
      const title = document.querySelector('.create_input').value.trim();
      if (!title) {
        alert('Заполните поле');
        return;
      }
  
      const categoryData = {
        name: title
      };
  
      try {
        const response = await fetch(`https://webfinalapi.mobydev.kz/category`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(categoryData) 
        });
  
        if (response.ok) {
          alert('Категория добавлена');
          window.location.href = '../categories/categories.html';
        } else {
          const errorData = await response.json();
          console.error('Ошибка от сервера:', errorData);
          alert('Ошибка при создании категории');
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Ошибка при отправке данных');
      }
    });
  });
  
  
  