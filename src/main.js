var version = "1.2";
var saveString = localStorage.getItem("detroit_stats");
if(saveString.includes(';')) {
    alert("This is a Detroit Legacy save.\nOnce you choose to move your save to Detroit 1.2\nyou cannot go back.")
    confirmMove = confirm("Move Legacy save to 1.2?\n\nCancel: No\nOK: Yes");
    if(!confirmMove) return;
    alert("moving save")
    legacy = saveString.split(';');
    legacyStats = {};
    modernStats = {};
    legacy.forEach(key => {
        legacyStats[key.split(":")[0]] = key.split(":")[1];
    });
    modernStats.saveVer = version;
    modernStats.attrib = {};
    modernStats.attrib.iq = legacyStats.iq;
    modernStats.attrib.def = legacyStats.def;
    modernStats.attrib.att = legacyStats.att;
    modernStats.attrib.health = legacyStats.h;
    modernStats.player = {};
    modernStats.player.name = legacyStats.name;
    modernStats.player.hwid = legacyStats.hwid;
    modernStats.player.location = legacyStats.at;
    modernStats.player.job = legacyStats.job;
    modernStats.player.inventory = legacyStats.inv;
    modernStats.display = {};
    modernStats.display.location = legacyStats.loc;
    alert(modernStats);
}