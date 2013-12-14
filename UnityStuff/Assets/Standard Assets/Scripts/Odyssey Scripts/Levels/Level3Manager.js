//Level 3 (charge segment)

private var numSuitors : int;

function Start () {

}

function Update () {
	numSuitors = GameObject.FindGameObjectsWithTag("suitor").Length;

	if (numSuitors <= 0) {
		SaySomething("You kicked their butts!");
	}
}

function SaySomething(thing : String) {
	var gui : GuiLevel3 = GameObject.FindWithTag("guiholder").GetComponent(GuiLevel3);
	gui.SetMessage(thing);
}