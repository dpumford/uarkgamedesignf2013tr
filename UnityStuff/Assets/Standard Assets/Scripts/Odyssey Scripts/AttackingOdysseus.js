var damage = 10;
var distance = 1.0;
var attackAngle = 90.0;
var attackSpeed = 1.0;
private var attackTimer = 0.0;

function Start () {

}

function Update () {
	if (attackTimer >= attackSpeed && Input.GetMouseButton(0)) {
		var suitors = GameObject.FindGameObjectsWithTag("suitor");
		
		for (var s = 0; s < suitors.Length; s++) {
			var suitor = suitors[s];
		
			var targetDir : Vector3 = suitor.transform.position - transform.position;
			var forward = transform.forward;
   			var angle = Vector3.Angle(targetDir, forward);
   			var distanceToSuitor = Vector3.Distance(this.transform.position, suitor.transform.position);
			
    		if (angle < attackAngle / 2 && distanceToSuitor <= distance) {
				suitor.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
    			attackTimer = 0;
    		}
		}
}
	else {
		attackTimer += Time.deltaTime;
	}
}