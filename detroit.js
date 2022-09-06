if(!localStorage.getItem("detroit_stats")) {
    localStorage.setItem("detroit_stats", {});
}

var stats = JSON.parse(localStorage.getItem("detroit_stats"));

if(stats.detroit != 1) {
    stats = {
        detroit: 1,
        inventory: []
    }
}