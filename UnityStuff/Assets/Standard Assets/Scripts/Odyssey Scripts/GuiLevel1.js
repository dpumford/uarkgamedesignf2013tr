private var message = "";
private var messageTimer = 0.0;
var messageDisplayTime = 10.0;

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
	var numWeapons = GameObject.FindGameObjectsWithTag("sword").Length + GameObject.FindGameObjectsWithTag("spear").Length + GameObject.FindGameObjectsWithTag("shield").Length;
	
	var caches = GameObject.FindGameObjectsWithTag("cache");
	var numCachedWeapons = 0;
	
	for (var c = 0; c < caches.Length; c++) {
		var cacheScript : CacheScript = caches[c].GetComponent(CacheScript);
	
		numCachedWeapons += cacheScript.NumWeapons();
	}

	GUI.Box(Rect(0, 0, 100, 32), numWeapons + "");
	GUI.Box(Rect(100, 0, 100, 32), numCachedWeapons + "");
	GUI.Box(Rect(200, 0, 500, 32), message);
}

function SetMessage(msg : String) {
	message = msg;
	messageTimer = messageDisplayTime;
}