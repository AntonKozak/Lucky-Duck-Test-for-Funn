let popupHeader = document.querySelector(".popupHeader");
let popupPrice = document.querySelector(".popupPrice");
let popupImg = document.querySelector(".popupImg");
let popupText = document.querySelector(".popupText");

// Add content to popup menu
function addPopupContent(cardNumber) {
    console.log(recipe);
    popupHeader.innerHTML = recipe[cardNumber].title;
    popupPrice.innerHTML = recipe[cardNumber].price + " KR";
    popupImg.setAttribute("src", recipe[cardNumber].image);
    popupText.innerHTML = recipe[cardNumber].description;
}



//open popup menu
const POPUP = document.getElementById("popup");

function openPopup(cardNumber) {
    POPUP.classList.add("openPopup");
    addPopupContent(cardNumber);
}
// Close popup menu
function closePopup() {
    POPUP.classList.remove("openPopup");
}