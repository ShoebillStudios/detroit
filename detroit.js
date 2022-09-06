if(!localStorage.getItem("detroit_stats")) {
    localStorage.setItem("detroit_stats", "detroit:1.0;inv:;name:PlayerName;iq:0;att:0;def:0;h:100;m:0;hwid:"+Math.random().toString().substring(2,5));
}

var objectStats = {};
var statString = localStorage.getItem("detroit_stats");
statString.split(";").forEach(stat => {
objectStats[stat.split(":")[0]] = stat.split(":")[1]
})

var gameDiv = document.getElementById("game");
var statsDiv = document.getElementById("stats");
updateStats();
function updateStats() {
    statsDiv.innerHTML = `
<p>Save Version: ${objectStats.detroit}</p>
<p>Money: ${objectStats.m}</p>
<p>Inventory: ${objectStats.inv}</p>
<p>Player Name: ${objectStats.name}</p>
<p>IQ: ${objectStats.iq}</p>
<p>Attack: ${objectStats.att}</p>
<p>Defense: ${objectStats.def}</p>
<p>Health: ${objectStats.h}</p>
<p>Locked to: ${objectStats.hwid}</p>`;
c = `detroit:${objectStats.detroit};inv:${objectStats.inv};name:${objectStats.name};iq:${objectStats.iq};att:${objectStats.att};def:${objectStats.def};h:${objectStats.h};m:${objectStats.m};hwid:${objectStats.hwid}`
localStorage.setItem("detroit_stats", c)
}
function createActionButton(action, callback) {
    a = document.createElement("button")
    a.appendChild(document.createTextNode(action))
    a.id = "action:"+action
    document.body.appendChild(a)
    callback(a);
    return a;
}

createActionButton("Debug: Raise IQ", (button) => {
    button.addEventListener("click", (event) => {
        objectStats.iq ++;
        updateStats();
    })
})

function openShop() {
    if(document.getElementById("shop")) {
        document.getElementById("shop").remove();
        return;
    }
    gameDiv.innerHTML += `<div id="shop"><h1>Shop</h1></div>`
    addShopItem({name:"Cool Test Item",cost:50,limit:3})
}

function addShopItem(item={name:"My Item", cost:5}, callback=(button)=>{}) {
    b = document.createElement('button')
    b.appendChild(document.createTextNode(item.name+": D$"+item.cost+" - Limit: "+item.limit))
    document.getElementById("shop").appendChild(b)
    b.onclick = function (event) {
        buyItemFromShop(item);
    }
    callback(b);
    return b;
}

function buyItemFromShop(item) {
    abc = 0;
    objectStats.inv.split(",").forEach(itemc => {
        if(itemc == item.name) {
            abc++;
        }
    })
    if(item.limit <= abc) {
        return;
    }
    if(objectStats.m >= item.cost) {
        objectStats.m = objectStats.m - item.cost;
        objectStats.inv += ","+item.name
        updateStats();
    }
}

createActionButton("Debug: Toggle Shop", (button) => {
    button.addEventListener("click", (event) => {
        openShop();
    })
})

createActionButton("Debug: Raise money", (button) => {
    button.onclick = (event) => {
        objectStats.m = 15000;
        updateStats();
    }
})

createActionButton("Debug: Reset", (button) => {
    button.onclick = (event) => {
        localStorage.setItem("detroit_stats", "detroit:1.0;inv:;name:PlayerName;iq:0;att:0;def:0;h:100;m:0;hwid:"+Math.random().toString().substring(2,5));
        statString = localStorage.getItem("detroit_stats");
        statString.split(";").forEach(stat => {
            objectStats[stat.split(":")[0]] = stat.split(":")[1]
            })        
        updateStats(); 
    }
})

createActionButton("Import Save", (button) => {
    button.onclick = function (event) {
        d = prompt("Save Text:")
        d.split(";").forEach(stat => {
            if(stat.startsWith("hwid")) {
                if(objectStats.hwid == stat.split(":")[1]) {
                    localStorage.setItem("detroit_stats", d)
                    statString = localStorage.getItem("detroit_stats");
        statString.split(";").forEach(stat => {
            objectStats[stat.split(":")[0]] = stat.split(":")[1]
            })     
                    updateStats();
                } else {
                    alert("Incompatible save.")
                }
            }
            })     
    }
})

createActionButton("Export Save", (button) => {
    button.onclick = function (event) {
        alert(localStorage.getItem("detroit_stats"))  
    }
})