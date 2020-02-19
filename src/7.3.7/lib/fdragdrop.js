nvg_dd.allowDrop = function(ev) {
	ev.preventDefault();
}

nvg_dd.drag = function(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

nvg_dd.drop = function(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

function nvg_dd(el1, el2){
	try
	{
		$(el1).attr("ondrop","nvg_dd.drop(event)");
		$(el2).attr("ondrop","nvg_dd.drop(event)");

		$(el1).attr("ondragover","nvg_dd.allowDrop(event)")
		$(el2).attr("ondragover","nvg_dd.allowDrop(event)");

		$(el1).children().attr("draggable","true");
		$(el1).children().attr("ondragstart","nvg_dd.drag(event)");
	}
	catch(e)
	{
		console.log("Drag and Drop isn't enabled");
	}
}