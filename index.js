const articlesContainer = document.querySelector(".articlesContainer");
const categorieTitle = document.querySelector(".catTitle");
const categorieSelect = document.getElementById("categoriesSelect");

let datas;
let datasCatFiltered;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
    displayArticles(datas.articles);
  });

const resetDisplay = () => {
  articlesContainer.innerHTML = ``;
};

const tetest = (a) => {
  console.log(a);
};

const displayArticles = (arr) => {
  let displayArray = arr;
  for (let i = 0; i < displayArray.length; i++) {
    articlesContainer.innerHTML += `
    <div class="article" id="${displayArray[i].id}">
                <div class="articleImgContainer">
                    <img src="${displayArray[i].img}" alt="picture of ${displayArray[i].name}">
                </div>
                <h2>${displayArray[i].name}</h2>
                <p>Stock : <span>${displayArray[i].stock}</span></p>
                <div class="articleBottom">
                    <div class="priceArticle">
                        <p><span>${displayArray[i].price}</span>M €</p>
                    </div>
                    <button onClick={tetest("${displayArray[i].id}")}>Add</button>
                </div>
            </div>
    `;
  }
};

categorieSelect.addEventListener("change", () => {
  if (categorieSelect.value === "all") {
    resetDisplay();
    displayArticles(datas.articles);
  } else if (categorieSelect.value === "planet") {
    resetDisplay();
    catFilter("planet");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "moon") {
    resetDisplay();
    catFilter("moon");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "launch") {
    resetDisplay();
    catFilter("launch");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "other") {
    resetDisplay();
    catFilter("other");
    displayArticles(datasCatFiltered);
  }
});

function catFilter(cat) {
  const filtered = datas.articles.filter((el) => {
    if (el.categorie === cat) {
      return true;
    } else {
      return false;
    }
  });
  datasCatFiltered = filtered;
}
