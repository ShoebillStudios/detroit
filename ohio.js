function weGoinToOhio() {
    addShopItem({name:"Job At OK Games",cost:50,limit:1}, (ev) => {
        objectStats.job = "OK Games";
        updateStats();
    })
}