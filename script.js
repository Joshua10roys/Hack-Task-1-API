// creating html elements using DOM
document.body.innerHTML = `
<div class="main-container">
<div class="nav">
    <h2 class="header">Nationalize API</h2>
</div>
<div class="container">
    <p>Predicts The Nationality</p>
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
        // fetching data
        getData(inputName)
        async function getData(name) {
            try {
                let response = await fetch(`https://api.nationalize.io/?name=${name}`);
                let response1 = await response.json();
                var cards = document.getElementById("cards");
                cards.innerHTML = `
                    <div class="card1">
                        <p>Country ID: ${response1.country[0].country_id}</p>
                        <p>Probability: ${response1.country[0].probability.toFixed(4)}</p>
                    </div>
                    <div class="card2">
                        <p>Country ID: ${response1.country[1].country_id}</p>
                        <p>Probability: ${response1.country[1].probability.toFixed(4)}</p>
                    </div>`

            }
            catch (error) {
                alert(error);
            }
        }
    }
})