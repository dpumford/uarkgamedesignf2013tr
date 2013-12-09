// Shoot tofu ball:
// If player presses LMB, make tofu ball appear, then move ball by force of 300 units
// 

var tofuball : Rigidbody;
var force : float = 300;


function Update ()
{
	
	if( Input.GetButtonDown("Fire1"))
	{
		var clone : Rigidbody = Instantiate(tofuball, transform.position, transform.rotation);	// this makes tofuball appear
		
		Physics.IgnoreCollision(clone.collider, transform.root.collider);
		
		clone.AddForce( force * transform.forward);	// make ball move. Apply force in the forward direction by amount "force"
	
	
	}
	
}