const articlesContainer = document.querySelector(".articlesContainer");

let datas;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
    displayArticles();
  });

const displayArticles = () => {
  /* for (let i = 0; i < datas.articles.length; i++) {
    articlesContainer.innerHTML += `
    <div class="article" id="${datas.articles[i].id}">
    <h4>${datas.articles[i].name}</h4>
    <p>${datas.articles[i].stock}</p>
    </div>
    `;
  } */
};
