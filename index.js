const articlesContainer = document.querySelector(".articlesContainer");
const categorieSelect = document.getElementById("categoriesSelect");
const cartContainer = document.querySelector(".cartContainer");
const totalContainer = document.querySelector(".totalContainer");
const emptyCart = document.getElementById("cartRemoveBtn");
const hideBtn = document.getElementById("hideCartBtn");
const cartH = document.querySelector(".cart");
const pay = document.getElementById("validateCart");

let datas, datasCatFiltered, stocks;
let cart = [];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    datas = data;
    displayArticles(datas.articles);
    displayCart();
  });

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

const verifyStock = (id, val) => {
  stocks = undefined;
  for (let i = 0; i < cart.length; i++) {
    if (id === cart[i].id) {
      stocks = val - cart[i].addToCart;
      return stocks;
    }
  }
};

const displayCart = () => {
  resetCartDisplay();
  let total = 0;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let priceTotalArticle = cart[i].price * cart[i].addToCart;
      total += priceTotalArticle;
      cartContainer.innerHTML += `
      <div class="cartArticle" id="${cart[i].id}"><p class="cartArticleName">${cart[i].name}</p><div class="cartArticleAddRemove"><button onClick={removeItemToCart("${i}")}>-</button><p>${cart[i].addToCart}</p><button onClick={addItemToCart("${i}")}>+</button></div><div><p class="cartArticlePrice">${priceTotalArticle}M €</p></div><button id="removeItemBtn" onClick={removeToCart("${i}")}>X</button></div>
      
      `;
    }
    totalContainer.textContent = total;
  } else {
    cartContainer.innerHTML = `
    <p class="emptyText">Your cart is empty</p>
    `;
    totalContainer.textContent = 0;
  }
};

const addToCart = (ind) => {
  for (let i = 0; i < datas.articles.length; i++) {
    if (ind === datas.articles[i].id) {
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

const resetDisplay = () => {
  articlesContainer.innerHTML = ``;
};

const resetCartDisplay = () => {
  cartContainer.innerHTML = ``;
};

/* EVENT */

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

hideBtn.addEventListener("click", () => {
  if (cartH.classList.contains("hidden")) {
    cartH.classList.remove("hidden");
  } else {
    cartH.classList.add("hidden");
  }
});

pay.addEventListener("click", () => {
  if (cart.length > 0) {
    cart = [];
    displayCart();
    selectDisplay();
    alert("Thank to your order");
  }
});
