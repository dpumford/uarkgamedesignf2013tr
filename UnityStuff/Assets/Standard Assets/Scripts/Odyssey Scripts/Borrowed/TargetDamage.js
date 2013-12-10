var hitPoints = 100.0;
var deadReplacement : Transform;
var dieSound : AudioClip;
var dead = false;


function ApplyDamage (damage : float) {
	Debug.Log(damage + " " + hitPoints);

	// We already have less than 0 hitpoints, maybe we got killed already?
	if (hitPoints <= 0.0)
		return;

	hitPoints -= damage;
	if (hitPoints <= 0.0)
	{
		Detonate();
	}
}

function Detonate () {
	// Destroy ourselves
	
	//Destroy(gameObject);
	
	// Play a dying audio clip
	if (dieSound)
		AudioSource.PlayClipAtPoint(dieSound, transform.position);
		
	//transform.parent.rigidbody.isKinematic = false;
	//transform.parent.rigidbody.AddForce (Vector3.forward * 5);	
	//transform.parent = null;
	// Replace ourselves with the dead body
	dead = true;
	
	this.active = false;
}

static function CopyTransformsRecurse (src : Transform,  dst : Transform) {
	dst.position = src.position;
	dst.rotation = src.rotation;
	
	for (var child : Transform in dst) {
		// Match the transform with the same name
		var curSrc = src.Find(child.name);
		if (curSrc)
			CopyTransformsRecurse(curSrc, child);
	}
}


function ApplyForce (body : Rigidbody) {
    var direction : Vector3 = body.transform.position - transform.position;
    body.AddForceAtPosition(direction.normalized, transform.position);
}