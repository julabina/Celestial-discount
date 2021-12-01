const articlesContainer = document.querySelector(".articlesContainer");
const categorieTitle = document.querySelector(".catTitle");
const categorieSelect = document.getElementById("categoriesSelect");
const cartContainer = document.querySelector(".cartContainer");

let datas;
let datasCatFiltered;
let cart = [
  { id: "ps2", name: "Saturn", addToCart: 1, price: 45 },
  { id: "ls1", name: "Saturn V", addToCart: 3, price: 45 },
];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
    displayArticles(datas.articles);
  });

const resetDisplay = () => {
  articlesContainer.innerHTML = ``;
};

const test = () => {
  for (let i = 0; i < cart.length; i++) {
    cartContainer.innerHTML += `
            <div class="cartArticle" id="${cart[i].id}">${cart[i].name} : ${cart[i].price} X ${cart[i].addToCart}<button>X</button></div>
        `;
  }
};

const addToCart = (a) => {
  for (let i = 0; i < datas.articles.length; i++) {
    if (a === datas.articles[i].id) {
      console.log(datas.articles[i].name);
    }
  }
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
                    <button onClick={addToCart("${displayArray[i].id}")}>Add</button>
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
