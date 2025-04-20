function getNewsIdFromUrl(){
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
const newsID = getNewsIdFromUrl();

const BASE_URL = "https://webfinalapi.mobydev.kz/";

async function fetchAndRenderNewsByID(newsID) {
  try {
    const response = await fetch(`${BASE_URL}news/${newsID}`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const news = await response.json();

    document.querySelector('.news_header').textContent = news.title;
    document.querySelector('.news_creator_info').textContent = news.author.name;
    document.querySelector('.news_date').textContent = news.createdAt;
    document.querySelector('.news_category').textContent = news.category.name;
    document.querySelector('.main_content_img').src = `${BASE_URL}${news.thumbnail}`;
    document.querySelector('.new_main_descr').textContent = news.content;
     
  } catch (error) {
    console.error("Ошибка запроса", error);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const newsID = getNewsIdFromUrl();
    if(newsID){
        fetchAndRenderNewsByID(newsID);
    }
    else{
        console.error('ID новости не найден')
    }
});