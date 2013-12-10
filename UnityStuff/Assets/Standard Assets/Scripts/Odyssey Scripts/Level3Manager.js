//Level 3 (charge segment)

private var numSuitors : int;

function Start () {

}

function Update () {
	numSuitors = GameObject.FindGameObjectsWithTag("suitor").Length;

	if (numSuitors <= 0) {
		Debug.Log("You win!");
	}
}