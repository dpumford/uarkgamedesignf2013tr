var maxNumWeapons = 4;
private var numWeapons = 0;
private var weapons = new String[maxNumWeapons];

function Start () {

}

function Update () {

}

function NumSlotsLeft() : int {
	return maxNumWeapons - numWeapons;
}

function NumWeapons() : int {
	return numWeapons;
}

function AddWeapon(weapon : String) {
	if (numWeapons < maxNumWeapons) {
		weapons[numWeapons] = weapon;
		numWeapons++;	
	}
}