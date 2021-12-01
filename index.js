const articlesContainer = document.querySelector(".articlesContainer");
const categorieTitle = document.querySelector(".catTitle");
const categorieSelect = document.getElementById("categoriesSelect");
const cartContainer = document.querySelector(".cartContainer");
const totalContainer = document.querySelector(".totalContainer");
const emptyCart = document.getElementById("cartRemoveBtn");

let datas;
let datasCatFiltered;
let stocks;
let cart = [];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
    displayArticles(datas.articles);
    displayCart();
  });

const resetDisplay = () => {
  articlesContainer.innerHTML = ``;
};

const resetCartDisplay = () => {
  cartContainer.innerHTML = ``;
};

const displayCart = () => {
  resetCartDisplay();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let priceTotalArticle = cart[i].price * cart[i].addToCart;
    total += priceTotalArticle;
    cartContainer.innerHTML += `
            <div class="cartArticle" id="${cart[i].id}">${cart[i].name} : ${cart[i].price}M € X ${cart[i].addToCart} = ${priceTotalArticle}M €<button onClick={removeItemToCart("${i}")}>-</button><button onClick={addItemToCart("${i}")}>+</button><button onClick={removeToCart("${i}")}>X</button></div>
        `;
  }
  totalContainer.textContent = total;
};

const verifyCart = (newArt) => {
  for (let i = 0; i < cart.length; i++) {
    if (newArt.id === cart[i].id) {
      if (cart[i].addToCart < cart[i].stock) {
        cart[i].addToCart = cart[i].addToCart + 1;
      }
      return;
    }
  }
  newArt.addToCart = 1;
  cart.push(newArt);
};

const addToCart = (a) => {
  for (let i = 0; i < datas.articles.length; i++) {
    if (a === datas.articles[i].id) {
      let art = {
        id: datas.articles[i].id,
        name: datas.articles[i].name,
        price: datas.articles[i].price,
        stock: datas.articles[i].stock,
        addToCart,
      };
      verifyCart(art);
    }
  }
  displayCart();
  selectDisplay();
};

const removeToCart = (ind) => {
  cart.splice(ind, 1);
  displayCart();
  selectDisplay();
};

const addItemToCart = (ind) => {
  for (let i = 0; i < datas.articles.length; i++) {
    if (datas.articles[i].id === cart[ind].id) {
      if (cart[ind].addToCart < datas.articles[i].stock) {
        cart[ind].addToCart = cart[ind].addToCart + 1;
        displayCart();
        selectDisplay();
      }
    }
  }
};

const removeItemToCart = (ind) => {
  if (cart[ind].addToCart > 1) {
    cart[ind].addToCart = cart[ind].addToCart - 1;
    displayCart();
    selectDisplay();
  } else {
    removeToCart(ind);
  }
};

const verifyStock = (id, val) => {
  stocks = undefined;
  for (let i = 0; i < cart.length; i++) {
    if (id === cart[i].id) {
      stocks = val - cart[i].addToCart;
      return stocks;
    }
  }
};

const selectDisplay = () => {
  resetDisplay();
  if (categorieSelect.value === "all") {
    displayArticles(datas.articles);
  } else if (categorieSelect.value === "planet") {
    catFilter("planet");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "moon") {
    catFilter("moon");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "launch") {
    catFilter("launch");
    displayArticles(datasCatFiltered);
  } else if (categorieSelect.value === "other") {
    catFilter("other");
    displayArticles(datasCatFiltered);
  }
};

const displayArticles = (arr) => {
  let displayArray = arr;
  for (let i = 0; i < displayArray.length; i++) {
    verifyStock(displayArray[i].id, displayArray[i].stock);
    let stock;
    if (stocks === undefined) {
      stock = displayArray[i].stock;
    } else {
      stock = parseInt(stocks);
    }
    articlesContainer.innerHTML += `
    <div class="article" id="${displayArray[i].id}">
                <div class="articleImgContainer">
                    <img src="${displayArray[i].img}" alt="picture of ${displayArray[i].name}">
                </div>
                <h2>${displayArray[i].name}</h2>
                <p>Stock : <span>${stock}</span></p>
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

categorieSelect.addEventListener("change", () => {
  selectDisplay();
});

emptyCart.addEventListener("click", () => {
  if (cart.length > 0) {
    isConfirm = confirm("Are you sure to empty your cart ?");
    if (isConfirm) {
      cart = [];
      displayCart();
      selectDisplay();
    }
  }
});
