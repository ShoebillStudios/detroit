if(!localStorage.getItem("detroit_stats")) {
    localStorage.setItem("detroit_stats", {});
}

var stats = JSON.parse(localStorage.getItem("detroit_stats"));

if(stats.detroit != 1) {
    stats = {
        detroit: 1,
        inventory: [],
        player: {
            name: "Player"+Math.random().toString().substring(2,6)
        },
        iq: 0,
        attack: 0,
        defense: 0,
        health: 100
    }
}

alert(stats)