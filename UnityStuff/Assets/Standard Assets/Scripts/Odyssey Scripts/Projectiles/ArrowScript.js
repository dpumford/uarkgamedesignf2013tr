var damage = 10;
var targetType : String;
var existTime = 10.0;
private var existTimer = 0.0;

function Start () {

}

function Update () {
	if (existTimer >= existTime) {
		active = false;
	}
	else {
		transform.LookAt(transform.position + rigidbody.velocity);
		transform.Rotate(0, 90 , 0);
	}
}

function OnTriggerEnter(other : Collider) {
	if (other.tag == targetType) {
		other.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	
		this.active = false;
	}
}