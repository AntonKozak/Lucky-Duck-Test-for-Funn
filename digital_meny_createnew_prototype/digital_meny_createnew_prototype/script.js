
class createdish {
    constructor(name, price, allergy, protein){
        this.name = name;
        this.price = price + "kr";
        this.allergy = allergy;
        this.protein = protein;
    }
}


function newdish(){
    let dish = new createdish(dish_name.value, dish_price.value, dish_allergy.value,  dish_protein.value)
    const fullmenu = document.getElementById("fullmenu");
    fullmenu.innerHTML += `<div class='dishCard'>
        <h1>${dish.name.toString()}</h1>
        <p>${dish.price.toString()}</p>
        <p>Allergi: ${dish.allergy.toString()}</p>
        <p>Protein: ${dish.protein.toString()}</p></div>`;
    const card = document.getElementsByClassName("dishCard");
}
