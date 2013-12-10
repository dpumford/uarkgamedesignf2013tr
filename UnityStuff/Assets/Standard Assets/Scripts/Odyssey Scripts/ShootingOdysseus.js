var projectile : Rigidbody;
var damage = 10;
var shootingSpeed = 1.0;
var force = 1.0;
private var shootingTimer = 0.0;

function Start () {
	
}

function Update () {
	if (shootingTimer >= shootingSpeed && Input.GetMouseButton(0)) {
		var newProjectile = Instantiate(projectile, this.transform.position, this.transform.rotation);
		Physics.IgnoreCollision(newProjectile.collider, transform.root.collider);
		newProjectile.AddForce(transform.forward * force);
		
		shootingTimer = 0;
	}
	else {
		shootingTimer += Time.deltaTime;
	}
}