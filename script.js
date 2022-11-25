
// creating html elements using DOM
document.body.innerHTML = `
<div class="main-container">
<div class="nav">
    <h2 class="header">Nationalize API</h2>
</div>
<div class="container">
    <h2>Predicts The Nationality</h2>
    <p>(Enter the name and hit show, to see name probability in different nations)</p>
    <input type="text" id="input">
    <button type="submit" id="botton">Show</button>
</div>
<div id="cards"></div>
<div class="footer fixed-bottom"></div>
</div>`

// getting button using DOM
var button = document.getElementById("botton");

// adding event listener to buton
button.addEventListener(("click"), () => {

    // adding trim and lower case function
    var inputName = document.getElementById("input").value.trim().toLowerCase();

    // alerting for empty input
    if (inputName.length < 1) {
        alert("Please Enter Name");
    }
    else {

        var cards = document.getElementById("cards");
        cards.innerHTML = '';

        // fetching data
        getData(inputName);
        async function getData(name) {

            try {
                let response = await fetch(`https://api.nationalize.io/?name=${name}`);
                let response1 = await response.json();
                if (response1.country.length > 0) {
                    response1.country.map((val, index) => {
                        var card = document.createElement('div');
                        card.setAttribute('class', 'card');
                        card.setAttribute('id', index + 1)
                        cards.appendChild(card);
                        card.innerHTML = `
                            <p>Country ID: ${val.country_id}</p>
                            <p>Probability: ${val.probability.toFixed(4)}</p>
                        `
                    })
                } else {
                    cards.innerHTML = `
                    <div class='card'>
                        <p>No Such Name</p>
                    </div>
                    `
                }

            }
            catch (error) {
                alert(error);
            }
        }
    }
})
