var projectile : Rigidbody;
var damage = 10;
var shootingSpeed = 1.0;
var force = 1.0;
var numArrows = 20;
private var shootingTimer = 0.0;

function Start () {
	
}

function Update () {
	if (numArrows > 0 && shootingTimer >= shootingSpeed && Input.GetMouseButton(0)) {
		var newProjectile = Instantiate(projectile, this.transform.position, this.transform.rotation);
		Physics.IgnoreCollision(newProjectile.collider, transform.root.collider);
		newProjectile.AddForce(transform.forward * force);
		
		shootingTimer = 0;
		numArrows--;
	}
	else {
		shootingTimer += Time.deltaTime;
	}
}

function NumberArrows() {
	return numArrows;
}