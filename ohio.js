function weGoinToOhio() {
    objectStats.at = "Ohio";
    updateStats();
    OhioShop();
}

function OhioStart() {
    objectStats.loc = "Ohio";
    updateStats();
}

function OhioShop() {
    objectStats.loc = "Shop (Ohio)"
    addShopItem({name:"Job At OK Games",cost:50,limit:1}, (ev) => {
        objectStats.job = "OK Games";
        updateStats();
    })
    addShopItem({name:"Ticket back to Detroit",cost:150,limit:1}, (event) => {
        alert("You're going to Detroit.")
        objectStats.loc = "Your Home (Detroit)";
        objectStats.at = "Detroit";
        updateStats();
        window.location.reload();
    })
}

function ExitOhioShop() {
    objectStats.loc = "Ohio";
    updateStats();
}