var maxNumWeapons = 2;
private var weapons : String[];
private var currentWeapon = 0;

private var thingsToSay = ["I'll just put these here.",
						   "Grunt",
						   "Telemachus had better know how to use these."];

function Start () {
	weapons = new String[maxNumWeapons];
	
	SaySomething("I should probably hide these weapons somewhere...");
}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if (other.tag == "sword" ||
		other.tag == "shield" ||
		other.tag == "spear") {
		if (currentWeapon < maxNumWeapons) {
			Debug.Log("Picked up " + other.tag + " " + currentWeapon);
			
			weapons[currentWeapon] = other.tag;
			currentWeapon++;
			
			other.active = false;
			
		}
	}
	else if (other.tag == "cache") {
		var cacheScript : CacheScript = other.GetComponent(CacheScript);
		var numSlotsLeft = cacheScript.NumSlotsLeft();
		
		if (numSlotsLeft > 0) {
			SaySomething(thingsToSay[Random.Range(0, thingsToSay.Length)]);
		}
		
		currentWeapon--;
		
		while (currentWeapon >= 0 && numSlotsLeft > 0) {
			other.SendMessage("AddWeapon", weapons[currentWeapon], SendMessageOptions.DontRequireReceiver);
			
			Debug.Log("Dropped off " + weapons[currentWeapon] + " " + currentWeapon);
			weapons[currentWeapon] = "";
			currentWeapon--;
		}
		
		currentWeapon++;
	}
}

function SaySomething(thing : String) {
	var gui : GuiLevel1 = GameObject.FindWithTag("guiholder").GetComponent(GuiLevel1);
	gui.SetMessage(thing);
}

function CarriedWeapons() : String[] {
	return weapons;
}