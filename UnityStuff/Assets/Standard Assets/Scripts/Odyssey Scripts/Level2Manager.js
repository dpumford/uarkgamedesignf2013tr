//Level 2 (Arrow shooting segment)
public var numSuitorsToChange : int;
public var nextLevel : String;

private var numSuitors : int;

function Start () {

}

function Update () {
	numSuitors = GameObject.FindGameObjectsWithTag("suitor").Length;

	if (numSuitors <= numSuitorsToChange) {
		Application.LoadLevel(nextLevel);
	}
}