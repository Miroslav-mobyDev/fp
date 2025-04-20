document.querySelector('.registr').addEventListener('submit' , async(event)=>{
    event.preventDefault();

    const name = document.querySelector('.name_input').value;
    const email = document.querySelector('.email_input').value;
    const password = document.querySelector('.password_input').value;

    try{
        const response = await fetch('https://webfinalapi.mobydev.kz/register', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,email,password})
        });
        if (response.ok) {
            const { token} = await response.json();
            localStorage.setItem('authToken', token);
            window.location.href = '../fp.html';
          } else {
            const errorData = await response.json();
            const errorText = JSON.stringify(errorData, null, 2);
            console.log('Ошибка от сервера:', errorText);
            alert(errorText);
          }
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
          alert('Произошла ошибка при отправке запроса.');
        }
        
    }
    
    
)