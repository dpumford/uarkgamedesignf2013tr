//Level 1 (Sneaking segment)
private var caches : GameObject[];
public var nextLevel : String;

function Start () {
	caches = GameObject.FindGameObjectsWithTag("cache");
}

function Update () {
	for (var c = 0; c < caches.Length; c++) {
		var cacheScript : CacheScript = caches[c].GetComponent(CacheScript);
		
		if (cacheScript.NumSlotsLeft() > 0) {
			return;
		}
	}

	//All caches are filled
	Application.LoadLevel(nextLevel);
}