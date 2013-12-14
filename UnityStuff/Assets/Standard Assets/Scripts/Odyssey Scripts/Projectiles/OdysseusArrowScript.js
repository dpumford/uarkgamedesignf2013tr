var damage = 10;

function Start () {

}

function Update () {
	transform.LookAt(transform.position + rigidbody.velocity);
	transform.Rotate(0, 90 , 0);
}

function OnTriggerEnter(other : Collider) {
	if (other.tag == "suitor") {
		other.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	
		this.active = false;
	}
}