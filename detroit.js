var version = "1.0";
var build = "-dev";
if(!localStorage.getItem("detroit_stats")) {
    prompts = ['Welcome to Detroit. What will we call you?', 'This is the beginning of your adventure in Detroit. What shall we call you?', 'Welcome to Detroit. What is your name?']
    newname = prompt(prompts[Math.floor(Math.random() * prompts.length)])
    alert("Welcome to Detroit, "+newname+".");
    localStorage.setItem("detroit_stats", "detroit:"+version+";inv:House Key;name:"+newname+";iq:0;att:0;def:0;h:100;m:20;hwid:"+Math.random().toString().substring(2,5)+";loc:Your Home (Detroit);job:None;at:Detroit");
}

var passive = 0;

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
<p>Money: D\$${objectStats.m}</p>
<p>IQ: ${objectStats.iq}</p>
<p>Attack: ${objectStats.att}</p>
<p>Defense: ${objectStats.def}</p>
<p>Health: ${objectStats.h}</p>`;
c = `detroit:${objectStats.detroit};inv:${objectStats.inv};name:${objectStats.name};iq:${objectStats.iq};att:${objectStats.att};def:${objectStats.def};h:${objectStats.h};m:${objectStats.m};hwid:${objectStats.hwid};loc:${objectStats.loc};job:${objectStats.job};at:${objectStats.at}`
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
        if(objectStats.at == "Ohio") {
            ExitOhioShop();
        }
        return;
    }
    gameDiv.innerHTML += `<div id="shop"><h1>Shop</h1></div>`
    if(objectStats.at == "Ohio") {
        OhioShop();
        return;
    }
    addShopItem({name:"Ticket to Ohio",cost:50,limit:1}, (event) => {
        alert("You're going to Ohio.")
        objectStats.loc = "Ohio";
        objectStats.at = "Ohio";
        updateStats();
        weGoinToOhio();
    })
    addShopItem({name:"Job at FloorStore",cost:10,limit:1}, (event) => {
        alert("Congratulations, you got the job.")
        objectStats.job = "FloorStore";
        updateStats();
    })
    addShopItem({name:"Balazation 5",cost:500,limit:2}, (event) => {
        alert("YOOO YOU GOT THE BALASTATION 5...")
        createActionButton("Play your Balazation5 "+Math.random().toString().substring(2,3), (button) => {
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

// Actions at the bottom of the screen

createActionButton("Go to Shop", (button) => {
    button.addEventListener("click", (event) => {
        objectStats.loc = "Shop (Detroit)"
        openShop();
        updateStats();
    })
})
createActionButton("View Inventory", (button) => {
    button.onclick = (ev) => {
        ivl = [];
    objectStats.inv.split(',').forEach(iv => {
        ivl.push(iv);
    })
    alert("Your Inventory\n\n"+ivl.join("\n"))
    }
})
inventorySort();
if(objectStats.m <= 20) {
    createActionButton("Look for old money", (button) => {
        button.onclick = function (ev) {
            alert("You found 5 dollars!");
            objectStats.m = +objectStats.m+5;
            updateStats();
            button.remove();
        }
    })
}
baaaa = document.createElement("br")
baaaa.id = "aa";
caaaa = document.createElement("br")
daaaa = document.createElement("h2")
daaaa.appendChild(document.createTextNode("Danger Zone"))
document.body.appendChild(baaaa)
document.body.appendChild(caaaa)
document.body.appendChild(daaaa)
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
if(objectStats.at == "Ohio") {
    OhioStart();
}

// Job Logic

setInterval(function () {
    if(objectStats.job != "None") {
        passive = 4;
    }
    if(objectStats.job == "OK Games") {
        passive = 12;
    }
    if(objectStats.job == "Six Above") {
        passive = 20
    }
    if(objectStats.job == "CEO OF DETROIT!!!") {
        passive = 120;
    }
    objectStats.m = +objectStats.m+passive;
        updateStats();
},2500)

function chance(chanceType) {
    a = Math.random().toString().substring(2,4);
    if(a <= chances[chanceType]) {
        
    }
}

if(objectStats.job != "None") {
    newJob(objectStats.job)
}
function inventorySort() {
    objectStats.inv.split(",").forEach(invItem => {
        if(invItem == "Ticket to Ohio") {
            if(objectStats.at == "Detroit") {
            createActionButton("Go to Ohio", (bev) => {
                bev.onclick = (ev) => {
                    alert("You're going to Ohio.")
                    objectStats.loc = "Ohio";
                    objectStats.at = "Ohio";
                    updateStats();
                    window.location.reload();
                }
            })
        }
        }
        if(invItem == "Ticket back to Detroit") {
            if(objectStats.at == "Ohio") {
                createActionButton("Go to Detroit", (bev) => {
                    bev.onclick = (ev) => {
                        alert("You're going to Detroit.")
                        objectStats.loc = "Detroit";
                        objectStats.at = "Detroit";
                        updateStats();
                        window.location.reload();
                    }
                })
            }
        }
        if(invItem == "Living in Ohio 101") {
            createActionButton("Read Living in Ohio 101", (bev) => {
                bev.onclick = (ev) => {
                    alert("Living in Ohio 101\nby Ohio Main")
                    alert("Step 1: live")
                    objectStats.iq = +objectStats.iq+2;
                    updateStats();
                    if(objectStats.iq >= 50) {
                        objectStats.inv += ",IQ Orb";
                        inventorySort();
                    }
                }
            })
        }
        if(invItem == "Crewmate Handbook") {
            createActionButton("Read Crewmate Handbook", (bev) => {
                bev.onclick = (ev) => {
                    alert("Crewmate Handbook\nby Ohio Main")
                    alert("Step 1: JUST BE CREW MATE!!!!")
                    objectStats.def = +objectStats.def+2;
                    updateStats();
                    if(objectStats.def >= 50) {
                        objectStats.inv += ",Defense Orb";
                        inventorySort();
                    }
                }
            })
        }
        if(invItem == "The Full Guide to Among Us") {
            createActionButton("Read Among Us Guide", (bev) => {
                bev.onclick = (ev) => {
                    alert("The Full Guide to Among Us\nby Ohio Main")
                    alert("Step 1: amog")
                    objectStats.att = +objectStats.att+2;
                    updateStats();
                    if(objectStats.att >= 50) {
                        objectStats.inv += ",Attack Orb";
                        inventorySort();
                    }
                }
            })
        }
        if(invItem == "IQ Orb") {
            createActionButton("Stare at IQ Orb", (bev) => {
                bev.onclick = (event) => {
                    alert("You stared at the IQ Orb.")
                    alert("It generated Money.")
                    objectStats.m = +objectStats.m+50
                    updateStats();
                }
            })
        }
        if(invItem == "Attack Orb") {
            createActionButton("Stare at Attack Orb", (bev) => {
                bev.onclick = (event) => {
                    alert("You stared at the Attack Orb.")
                    alert("It generated Money.")
                    objectStats.m = +objectStats.m+50
                    updateStats();
                }
            })
        }
        if(invItem == "Defense Orb") {
            createActionButton("Stare at Defense Orb", (bev) => {
                bev.onclick = (event) => {
                    alert("You stared at the Defense Orb.")
                    alert("It generated Money.")
                    objectStats.m = +objectStats.m+50
                    updateStats();
                }
            })
        }
        if(invItem == "The Orb") {
            createActionButton("Orb", (bev) => {
                bev.onclick = (event) => {
                    
                }
            })
        }
    })
}


versionElement = document.createElement("p")
versionElement.appendChild(document.createTextNode("Detroit Adventure v"+version))
document.body.appendChild(versionElement)