var speed = 3.0;
var damage = 10;
var numSpears = 5;
var waitTime = 10;
var attackTime = 1;

private var waitTimer = 0.0;
private var attackTimer = 0.0;
private var rotationSpeed = 5.0;

var WayPointHolder : Transform;
private var patrolPoints : Transform[]; 
var projectile : Rigidbody;
private var curPatrol : int = 0;
var force = 10;
private var target : GameObject;

// Make sure there is always a character controller
@script RequireComponent (CharacterController)

function Start () {
	if(WayPointHolder)
	{
		var children = WayPointHolder.childCount;
		patrolPoints =  new Transform[children];

		for(var i : int = 0; i < children ; i++)
		{
			patrolPoints[i] = WayPointHolder.GetChild(i);		
		}
	}
	
	curPatrol = Random.Range(0, patrolPoints.Length);
	
	target = GameObject.FindWithTag("Player");
}

function Update() {
	var directionToWaypoint : Vector3 = patrolPoints[curPatrol].position - transform.position;
	var distanceToWaypoint = directionToWaypoint.magnitude;
	
	if (distanceToWaypoint <= 0.5) {
		if (waitTimer >= waitTime) {
			curPatrol = Random.Range(0, patrolPoints.Length);
			waitTimer = 0.0;
		}
		else {
			waitTimer += Time.deltaTime;
			
			if (numSpears > 0 && attackTimer >= attackTime) {
				var newProjectile = Instantiate(projectile, this.transform.position, this.transform.rotation);
				
				//Physics.IgnoreCollision(newProjectile.collider, transform.root.collider);
				newProjectile.AddForce(transform.forward * force);
				
				attackTimer = 0.0;
				numSpears--;
			}
			else {
				attackTimer += Time.deltaTime;
			}
		}
	}
	else {
		transform.position += (speed * directionToWaypoint.normalized * Time.deltaTime);
	}
	
	transform.LookAt(target.transform.position + Vector3(Random.Range(-1, 1), 5, Random.Range(-1, 1)));
}