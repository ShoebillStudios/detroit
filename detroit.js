var version = "1.0";
if (!localStorage.getItem("detroit_stats")) {
    prompts = ['Welcome to Detroit. What will we call you?', 'This is the beginning of your adventure in Detroit. What shall we call you?', 'Welcome to Detroit. What is your name?'];
    newname = prompt(prompts[Math.floor(Math.random() * prompts.length)]);
    alert("Welcome to Detroit, " + newname + ".");
    localStorage.setItem("detroit_stats", "detroit:" + version + ";inv:House Key;name:" + newname + ";iq:0;att:0;def:0;h:100;m:0;hwid:" + Math.random().toString().substring(2, 5) + ";loc:Your Home (Detroit)");
}

var objectStats = {};
var statString = localStorage.getItem("detroit_stats");
statString.split(";").forEach(function (stat) {
    objectStats[stat.split(":")[0]] = stat.split(":")[1];
});

var gameDiv = document.getElementById("game");
var statsDiv = document.getElementById("stats");
updateStats();
function updateStats() {
    statsDiv.innerHTML = `
<p>Money: ${objectStats.m}</p>
<p>Inventory: ${objectStats.inv}</p>
<p>Location: ${objectStats.loc}</p>
<p>IQ: ${objectStats.iq}</p>
<p>Attack: ${objectStats.att}</p>
<p>Defense: ${objectStats.def}</p>
<p>Health: ${objectStats.h}</p>`;
    c = `detroit:${objectStats.detroit};inv:${objectStats.inv};name:${objectStats.name};iq:${objectStats.iq};att:${objectStats.att};def:${objectStats.def};h:${objectStats.h};m:${objectStats.m};hwid:${objectStats.hwid};loc:${objectStats.loc}`;
    localStorage.setItem("detroit_stats", c);
}
function createActionButton(action, callback) {
    a = document.createElement("button");
    a.appendChild(document.createTextNode(action));
    a.id = "action:" + action;
    document.body.appendChild(a);
    callback(a);
    return a;
}

function openShop() {
    if (document.getElementById("shop")) {
        document.getElementById("shop").remove();
        objectStats.loc = "Your Home (Detroit)";
        updateStats();
        return;
    }
    gameDiv.innerHTML += `<div id="shop"><h1>Shop</h1></div>`;
    addShopItem({ name: "Ticket to Ohio", cost: 50, limit: 1 }, function (tem) {
        tem.addEventListener("click", function () {
            alert("You're going to Ohio.");
            objectStats.loc = "Ohio";
            updateStats();
        });
    });
}

function addShopItem(item = { name: "My Item", cost: 5 }, callback = function (button) { }) {
    b = document.createElement('button');
    b.appendChild(document.createTextNode(item.name + ": D$" + item.cost + " - Limit: " + item.limit));
    document.getElementById("shop").appendChild(b);
    b.onclick = function (event) {
        buyItemFromShop(item);
    };
    return b;
}

function buyItemFromShop(item) {
    abc = 0;
    objectStats.inv.split(",").forEach(function(itemc) {
        if (itemc == item.name) {
            abc++;
        }
    });
    if (item.limit <= abc) {
        return;
    }
    if (objectStats.m >= item.cost) {
        objectStats.m = objectStats.m - item.cost;
        objectStats.inv += "," + item.name;
        updateStats();
    }
}

createActionButton("Go to Shop", function (button) {
    button.addEventListener("click", function (event) {
        objectStats.loc = "Shop (Detroit)";
        openShop();
        updateStats();
    });
});

createActionButton("Reset", function (button) {
    button.onclick = function (event) {
        cc = confirm("You are about to lose all of your progress in Detroit Adventure.\nAre you sure?");
        if (!cc) return;
        cb = confirm("This is irreversible without a save code. Last chance to cancel.");
        if (!cb ) return;
        localStorage.setItem("detroit_stats", "");
        window.location.reload();
    };
});

createActionButton("Import Save", function (button) {
    button.onclick = function (event) {
        d = prompt("Save Text:");
        d.split(";").forEach(function (stat) {
            if (stat.startsWith("detroit")) {
                ver = stat.split(":")[1];
                if (ver != version) {
                    cc = confirm("This save is on version v" + ver + " and you're on v" + version + "!\nImporting this is dangerous and you could lose newer data");
                    if (!cc) return;
                }
            }
            if (stat.startsWith("hwid")) {
                if (objectStats.hwid == stat.split(":")[1]) {
                    localStorage.setItem("detroit_stats", d);
                    statString = localStorage.getItem("detroit_stats");
                    statString.split(";").forEach(function (stat) {
                        objectStats[stat.split(":")[0]] = stat.split(":")[1];
                    });
                    updateStats();
                } else {
                    alert("Incompatible save.");
                }
            }
        });
        if (objectStats.detroit != version) {
            objectStats.detroit += " (Dangerous)";
            updateStats();
        }
    };
});

createActionButton("Export Save", function (button) {
    button.onclick = function (event) {
        alert(localStorage.getItem("detroit_stats"));
    };
});