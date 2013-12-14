var speed = 3.0;
var minDistance = 10.0;
var maxDistance = 20.0;
var damage = 1;
var attackTime = 1;

private var attackTimer = 0.0;
private var aimer;

var projectile : Rigidbody;
var force = 1000;
private var target : GameObject;

function Start () {
	target = GameObject.FindWithTag("Player");
	aimer = transform.GetChild(0);
	
	attackTimer = Random.Range(0, attackTime);
}

function Update() {
	var directionToTarget = transform.position - target.transform.position;
	var distanceToTarget = directionToTarget.magnitude;
	var directionNormalized = directionToTarget.normalized;

	if (distanceToTarget < minDistance) {
		transform.position += (speed * Vector3(directionNormalized.x, 0, directionNormalized.z) * Time.deltaTime);
	}
	else if (distanceToTarget > maxDistance) {
		directionNormalized *= -1;
		transform.position += (speed * Vector3(directionNormalized.x, 0, directionNormalized.z) * Time.deltaTime);
	}
	else {
		if (attackTimer >= attackTime) {
			var newProjectile = Instantiate(projectile, aimer.position, aimer.rotation);
			
			newProjectile.AddForce(aimer.forward * force);
			
			attackTimer = 0.0;
		}
		else {
			attackTimer += Time.deltaTime;
		}
	}
	
	aimer.LookAt(target.transform.position + Vector3(Random.Range(-1, 1), 3 * (distanceToTarget/20), Random.Range(-1, 1)));
}