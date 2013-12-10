
var speed = 3.0;
var damage = 10;


private var rotationSpeed = 5.0;

var attackRange = 1.97;
var PursueRange = 30.0;
var pursueAngle = 360.0;
private var attackAngle = 4.0;

private var idleTime = 1.6;

private var timeout = 3.0;


private var punchPosition = new Vector3 (0.4, .13, .85);
private var punchRadius = 1.19;


private var isAttacking = false;
private var lastPunchTime = 0.0;

private var dontComeCloserRange = 5.0;
private var delayattackTime = 0.35;
private var pickNextWaypointDistance = .75;
private var maxWaypointDistance = 10.0;
private var target : Transform;
private var isMelee = true;

var WayPointHolder : Transform;

private var patrolPoints : Transform[]; 
var projectile : Rigidbody;
private var curPatrol : int = 0;
var force = 10;

private var lastShot = -10.0;
private var raycastOffset : Vector3 = Vector3.zero;

// Make sure there is always a character controller
@script RequireComponent (CharacterController)

function Start () {
	// Auto setup player as target through tags
	if (target == null && GameObject.FindWithTag("Player"))
		target = GameObject.FindWithTag("Player").transform;

	if(projectile)
		isMelee = false;
	
	if(WayPointHolder)
	{
		
		var children = WayPointHolder.childCount;
		patrolPoints =  new Transform[children];

		for(var i : int = 0; i < children ; i++)
		{
			patrolPoints[i] = WayPointHolder.GetChild(i);
		
		
		}
	
	}
		
	Patrol();
	
	
}



function Patrol () {
	if(patrolPoints.length > 0) 
		var curWayPoint = patrolPoints[curPatrol];
		
	Debug.Log(patrolPoints.Length + " " + curPatrol);

	while (true) {
		
		if(patrolPoints.length > 0) 
		{
			var waypointPosition = curWayPoint.position;
			if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
				curWayPoint = PickNextWaypoint (curWayPoint);
		}
		// Pursue the player and wait until
		// - player is killed
		// - player is out of sight		
		if (CanSeeTarget ())
			yield StartCoroutine("PursuePlayer");
		
		// Move towards our target
		if(patrolPoints.length > 0) 
			MoveTowards(waypointPosition);
		
		yield;
	}
}


function CanSeeTarget () : boolean {
	
	if (Vector3.Distance(transform.position, target.position) > PursueRange)
		return false;
	
	// Check to make sure Enemy can "see" target based on PursueAngle
	var targetDir : Vector3 = target.position - transform.position;
	var forward = transform.forward;
    var angle = Vector3.Angle(targetDir, forward);
    if (angle > pursueAngle / 2)
    	return;
		
	Debug.DrawRay ((transform.position - Vector3.up*1), transform.TransformDirection(Vector3.forward * 10), Color.green);

	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
	//	if (Physics.Raycast (transform.position, transform.TransformDirection(Vector3.forward * 5), hit))
			return hit.transform == target;

	return false;
}

function attack () {
	// Start attack animation
	//animation.CrossFade("attack", 0.3);
	//animation.CrossFadeQueued("1h_attack1", 0.1, QueueMode.PlayNow);

		var pos = transform.TransformPoint(punchPosition); //needs to be attack range; if player in in attack range, enemy stops pursuing and starts punch of fighting
		if(Time.time > lastPunchTime + 0.3 && (pos - target.position).magnitude < punchRadius)
		{
			// deal damage
			target.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
			//Debug.Log("punch");
			// knock the player back and to the side
			var slamDirection = transform.InverseTransformDirection(target.position - transform.position);
			slamDirection.y = 0;
			slamDirection.z = 1;
			if (slamDirection.x >= 0)
				slamDirection.x = 1;
			else
				slamDirection.x = -1;
			target.SendMessage("Slam", transform.TransformDirection(slamDirection), SendMessageOptions.DontRequireReceiver);
			lastPunchTime = Time.time;
		}
		
	// Wait until half the animation has played
	yield WaitForSeconds(delayattackTime);
	
	// Fire gun
	//BroadcastMessage("Fire");
	if(!isMelee){
	Debug.Log("fire");
	Fire();
	}
	// Wait for the rest of the animation to finish
	//yield WaitForSeconds(animation["attack"].length - delayattackTime);
		yield WaitForSeconds(delayattackTime);

}


function Fire()
{
		var clone : Rigidbody;
        clone = Instantiate(projectile, transform.position+ transform.TransformDirection (Vector3.forward *2) , transform.rotation);
        
        // Give the cloned object an initial velocity along the current 
        // object's Z axis
        clone.velocity = transform.TransformDirection (Vector3.forward * force);	
	
}
function PursuePlayer () {
	var lastVisiblePlayerPosition = target.position;
	while (true) {
		if (CanSeeTarget ()) {
			// Target is dead - stop hunting
			if (target == null)
				return;

			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, target.position);
			if (distance > PursueRange * 3)
				return;
			
			lastVisiblePlayerPosition = target.position;
			if (distance > attackRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start attacking if close and play is in sight
			if (distance < attackRange && angle < attackAngle)
				yield StartCoroutine("attack");
		} else {
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop Pursueing
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}

function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	while (timeout > 0.0) {
		MoveTowards(position);

		// We found the player
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}

function RotateTowards (position : Vector3) {
	SendMessage("SetSpeed", 0.0, SendMessageOptions.DontRequireReceiver);
	
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0, SendMessageOptions.DontRequireReceiver);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	direction = forward * speed * speedModifier;
	GetComponent (CharacterController).SimpleMove(direction);
	
	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function PickNextWaypoint (currentWaypoint : Transform) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	curPatrol++;
	if(curPatrol >= patrolPoints.length)
		curPatrol = 0;
	
	return patrolPoints[curPatrol];
}


 function FindClosest (pos : Vector3)  {
	// The closer two vectors, the larger the dot product will be.
	var closest : Transform;
	var closestDistance = 100000.0;
	for (var cur : Transform in patrolPoints) {
		var distance = Vector3.Distance(cur.transform.position, pos);
		if (distance < closestDistance)
		{
			closestDistance = distance;
			closest = cur;
		}
	}

	return closest;
}

function OnDrawGizmosSelected ()
{
	Gizmos.color = Color.yellow;
	Gizmos.DrawWireSphere (transform.TransformPoint(punchPosition), punchRadius);
	
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere (transform.position, PursueRange);
	
	Gizmos.color = Color.green;
	Gizmos.DrawWireSphere(transform.position, attackRange);
}