var version = "1.2";
var saveString = localStorage.getItem("detroit_stats");
if(saveString.includes(';')) {
    alert("This is a Detroit Legacy save.\nOnce you choose to move your save to Detroit 1.2\nyou cannot go back.")
    confirmMove = confirm("Move Legacy save to 1.2?\n\nCancel: No\nOK: Yes");
    if(!confirmMove) return;
    alert("moving save")
}