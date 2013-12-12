private var message = "";
private var messageTimer = 0.0;
var messageDisplayTime = 10.0;

var numArrows : int;
static var Instance : GuiLevel2;

function Awake () {
	Instance = this;
}

function Start () {
	
}

function Update () {
	if (messageTimer > 0) {
		messageTimer -= Time.deltaTime;
	}
	else {
		message = "";
	}
}

function OnGUI() {
//	var arrowScript : ArrowsLevel2;
	
//	var caches = GameObject.FindGameObjectsWithTag("cache");
//	var numCachedWeapons = 0;
//	
//	for (var c = 0; c < caches.Length; c++) {
//		var cacheScript : CacheScript = caches[c].GetComponent(CacheScript);
//	
//		numCachedWeapons += cacheScript.NumWeapons();
//	}

	GUI.Box(Rect(0, 0, 100, 32), numArrows + "");
//	GUI.Box(Rect(100, 0, 100, 32), numCachedWeapons + "");
	GUI.Box(Rect(100, 0, 500, 32), message);
}

function SetMessage(msg : String) {
	message = msg;
	messageTimer = messageDisplayTime;
}