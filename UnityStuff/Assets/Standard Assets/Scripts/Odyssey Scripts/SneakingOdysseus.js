var maxNumWeapons = 2;
private var weapons : GameObject[];
private var currentWeapon = 0;

function Start () {
	weapons = new GameObject[maxNumWeapons];
}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	Debug.Log(other.tag);

	if (other.tag == "weapon") {
		if (currentWeapon < maxNumWeapons) {
			//TODO: Store weapon
			//weapons[currentWeapon] = other;
			currentWeapon++;
			
			other.active = false;
		}
	}
	else if (other.tag == "cache") {
		//TODO: Check to make sure the cache is not full
		
		//TODO: Add Odysseus' weapons to cache
		other.SendMessage("AddWeapons", currentWeapon, SendMessageOptions.DontRequireReceiver);
		currentWeapon = 0;
	}
}