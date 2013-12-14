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
	var shootingOdysseus : ShootingOdysseus = GameObject.FindWithTag("MainCamera").GetComponent(ShootingOdysseus);
	var numSuitors = GameObject.FindGameObjectsWithTag("suitor").Length;

	GUI.Box(Rect(0, 0, 150, 32), "Arrows: " + shootingOdysseus.NumberArrows());
	GUI.Box(Rect(150, 0, 150, 32), "Suitors: " + numSuitors);
	GUI.Box(Rect(300, 0, 500, 32), message);
}

function SetMessage(msg : String) {
	message = msg;
	messageTimer = messageDisplayTime;
}