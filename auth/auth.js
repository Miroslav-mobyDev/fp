document.querySelector('.authorization').addEventListener('submit' , async(event)=>{
    event.preventDefault();

    const email = document.querySelector('.email_input').value;
    const password = document.querySelector('.password_input').value;

    try{
        const response = await fetch('https://webfinalapi.mobydev.kz/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        });
        if(response.ok){
            const {token} = await response.json();
            localStorage.setItem('authToken', token );
            window.location.href = '../fp.html';
        } else{
            alert('Неверный формат');
        }
        
    }
    catch(error){
        console.error('Ошибка при авторизации',error)
    }
    
})