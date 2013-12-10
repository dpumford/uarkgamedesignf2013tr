var maxNumWeapons = 4;
private var numWeapons = 0;

function Start () {

}

function Update () {

}

function NumWeaponsLeft() : int {
	return maxNumWeapons - numWeapons;
}

function AddWeapons(num : int) {
	numWeapons += num;
}