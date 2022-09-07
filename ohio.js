function weGoinToOhio() {
    objectStats.at = "Ohio";
    updateStats();
    OhioShop();
}

function OhioStart() {
    objectStats.loc = "Ohio";
    updateStats();
    document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Walter_White_S5B.png/220px-Walter_White_S5B.png');"
}

function OhioShop() {
    objectStats.loc = "Shop (Ohio)"
    addShopItem({name:"Job At OK Games",cost:150,limit:1}, (ev) => {
        objectStats.job = "OK Games";
        updateStats();
    })
    addShopItem({name:"Job at Six Above",cost:160,limit:1}, (ev) => {
        objectStats.job = "Six Above";
        updateStats();
    })
    addShopItem({name:"Ticket back to Detroit",cost:200,limit:1}, (event) => {
        alert("You're going to Detroit.")
        objectStats.loc = "Your Home (Detroit)";
        objectStats.at = "Detroit";
        updateStats();
        window.location.reload();
    })
    addShopItem({name:"The Orb",cost:15000,limit:1} , (event) => {
        
    })
    addShopItem({name:"Living in Ohio 101", cost:10,limit:1}, (event) => {
        alert("Read this book to gain IQ.")
        window.location.reload();
    })
    addShopItem({name:"CEO of DETROIT",cost:250,limit:1}, (event) => {
        alert("You're the CEO of detroit.")
        objectStats.job = "CEO OF DETROIT!!!"
        alert("This is the highest paying job.")
        updateStats();
    })
}

function ExitOhioShop() {
    objectStats.loc = "Ohio";
    updateStats();
}