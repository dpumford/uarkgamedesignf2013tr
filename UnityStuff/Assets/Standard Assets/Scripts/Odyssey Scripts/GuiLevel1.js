

function Start () {
	
}

function Update () {

}

function OnGUI() {
	var numWeapons = GameObject.FindGameObjectsWithTag("weapon").Length + "";

	GUI.Box(Rect(0, 0, 100, 32), numWeapons);
}