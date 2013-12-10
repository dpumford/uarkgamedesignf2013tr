//Level 1 (Sneaking segment)
private var caches : GameObject[];
public var nextLevel : String;

public static var numWeaponsDelivered = 0;

function Start () {
	caches = GameObject.FindGameObjectsWithTag("cache");
}

function Update () {
	var weapons = GameObject.FindGameObjectsWithTag("weapon");

	//TODO: Mechanics for caches
	if (true) {
		Application.LoadLevel(nextLevel);
	}
}