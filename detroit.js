var version = "1.0";
if(!localStorage.getItem("detroit_stats")) {
    prompts = ['Welcome to Detroit. What will we call you?', 'This is the beginning of your adventure in Detroit. What shall we call you?', 'Welcome to Detroit. What is your name?']
    newname = prompt(prompts[Math.floor(Math.random() * prompts.length)])
    alert("Welcome to Detroit, "+newname+".");
    localStorage.setItem("detroit_stats", "detroit:"+version+";inv:House Key;name:"+newname+";iq:0;att:0;def:0;h:100;m:0;hwid:"+Math.random().toString().substring(2,5)+";loc:Your Home (Detroit);job:None");
}

var chances = {
    r: 25
}

var objectStats = {};
var statString = localStorage.getItem("detroit_stats");
statString.split(";").forEach(stat => {
objectStats[stat.split(":")[0]] = stat.split(":")[1]
})

if(objectStats.detroit != version) {
    alert("Your save is from an older version. Updating your save")
}

var gameDiv = document.getElementById("game");
var statsDiv = document.getElementById("stats");
updateStats();
function updateStats() {
    statsDiv.innerHTML = `
<p>Job: ${objectStats.job}</p>
<p>Money: ${objectStats.m}</p>
<p>Inventory: ${objectStats.inv}</p>
<p>Location: ${objectStats.loc}</p>
<p>IQ: ${objectStats.iq}</p>
<p>Attack: ${objectStats.att}</p>
<p>Defense: ${objectStats.def}</p>
<p>Health: ${objectStats.h}</p>`;
c = `detroit:${objectStats.detroit};inv:${objectStats.inv};name:${objectStats.name};iq:${objectStats.iq};att:${objectStats.att};def:${objectStats.def};h:${objectStats.h};m:${objectStats.m};hwid:${objectStats.hwid};loc:${objectStats.loc};job:${objectStats.job}`
localStorage.setItem("detroit_stats", c)
}
function createActionButton(action, callback) {
    if(document.getElementById("action:"+action)) {
        document.getElementById("action:"+action).remove();
    }
    a = document.createElement("button")
    a.appendChild(document.createTextNode(action))
    a.id = "action:"+action
    document.body.appendChild(a)
    callback(a);
    return a;
}

function openShop() {
    if(document.getElementById("shop")) {
        document.getElementById("shop").remove();
        objectStats.loc = "Your Home (Detroit)"
        updateStats();
        return;
    }
    if(!objectStats.loc.includes("Detroit")) {
        newLocation(objectStats.loc);
    }
    gameDiv.innerHTML += `<div id="shop"><h1>Shop</h1></div>`
    addShopItem({name:"Ticket to Ohio",cost:50,limit:1}, (event) => {
        alert("You're going to Ohio.")
        objectStats.loc = "Ohio";
        updateStats();
        weGoinToOhio();
    })
    addShopItem({name:"Job at FloorStore",cost:1,limit:1}, (event) => {
        alert("Congratulations, you got the job.")
        objectStats.job = "FloorStore";
        updateStats();
    })
    addShopItem({name:"Balazation 5",cost:500,limit:2}, (event) => {
        alert("YOOO YOU GOT THE BALASTATION 5...")
        createActionButton("Play your Balazation5", (button) => {
            button.onclick = function (event) {
                alert("You've won the DutyCal Tournament!!!")
                objectStats.m = +objectStats.m + 5000;
                updateStats();
                button.remove();
            }
        })
    })
}

function addShopItem(item={name:"My Item", cost:5,limit:3}, callback=(button)=>{}) {
    var abc = 0;
    objectStats.inv.split(',').forEach(invItem => {
        if(invItem == item.name) {
            abc++;
        }
    })
    if(abc == item.limit) {
        return;
    }
    b = document.createElement('button')
    b.appendChild(document.createTextNode(item.name+": D$"+item.cost+" - Limit: "+item.limit))
    document.getElementById("shop").appendChild(b)
    b.onclick = function (event) {
        buyItemFromShop(item, callback);
    }
    return b;
}

function buyItemFromShop(item, callback) {
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
        openShop();
    openShop();
    callback();
    }
}

createActionButton("Go to Shop", (button) => {
    button.addEventListener("click", (event) => {
        objectStats.loc = "Shop (Detroit)"
        openShop();
        updateStats();
    })
})

createActionButton("Reset", (button) => {
    button.onclick = (event) => {
        cc = confirm("You are about to lose all of your progress in Detroit Adventure.\nAre you sure?")
        if(!cc == true) return;
        cb = confirm("This is irreversible without a save code. Last chance to cancel.")
        if(!cb == true) return;
        localStorage.setItem("detroit_stats", "");
        window.location.reload();
    }
})

createActionButton("Import Save", (button) => {
    button.onclick = function (event) {
        d = prompt("Save Text:")
        d.split(";").forEach(stat => {
            if(stat.startsWith("detroit")) {
                ver = stat.split(":")[1];
                if(ver != version) {
                    cc = confirm("This save is on version v"+ver+" and you're on v"+version+"!\nImporting this is dangerous and you could lose newer data")
                    if(!cc == true) return;
                }
            }
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
        if(objectStats.detroit != version) {
            objectStats.detroit += " (Dangerous)";
            updateStats();
        } 
    }
})

createActionButton("Export Save", (button) => {
    button.onclick = function (event) {
        alert(localStorage.getItem("detroit_stats"))  
    }
})

if(objectStats.m == 0) {
    createActionButton("Look for old money", (button) => {
        button.onclick = function (ev) {
            alert("You found 5 dollars!");
            objectStats.m = +objectStats.m+5;
            updateStats();
            button.remove();
        }
    })
}

setInterval(function () {
    if(objectStats.job != "None") {
        objectStats.m = +objectStats.m+2;
        updateStats();
    }
    if(objectStats.job == "OK Games") {
        objectStats.m = +objectStats.m+12;
        updateStats();
    }
},2500)

function chance(chanceType) {
    a = Math.random().toString().substring(2,4);
    if(a <= chances[chanceType]) {
        
    }
}

if(objectStats.job != "None") {
    newJob(objectStats.job)
}

