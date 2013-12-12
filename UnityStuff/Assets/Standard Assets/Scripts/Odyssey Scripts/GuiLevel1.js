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
	
	var inventory = "Inventory\n";
	var sneakingOdysseus : SneakingOdysseus = GameObject.FindWithTag("Player").GetComponent(SneakingOdysseus);
	
	for (var w = 0; w < sneakingOdysseus.CarriedWeapons().Length; w++) {
		inventory += sneakingOdysseus.CarriedWeapons()[w] + "\n";
	}

	GUI.Box(Rect(0, 0, 150, 32), "Weapons Left: " + numWeapons);
	GUI.Box(Rect(150, 0, 150, 32), "Weapons Cached: " + numCachedWeapons);
	GUI.Box(Rect(300, 0, 500, 32), message);
	GUI.Box(Rect(0, 32, 150, 96), inventory);
}

function SetMessage(msg : String) {
	message = msg;
	messageTimer = messageDisplayTime;
}