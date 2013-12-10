var damage = 10;

function Start () {

}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if (other.tag == "suitor") {
		other.SendMessage("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	
		this.active = false;
	}
}