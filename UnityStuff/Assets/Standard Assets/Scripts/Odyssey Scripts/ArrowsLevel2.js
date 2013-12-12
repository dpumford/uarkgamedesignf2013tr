// Shoot arrows:
// If player presses LMB, make tofu ball appear, then move ball by force of 300 units
// 

var arrow : Rigidbody;
private var numArrows : int;
var force : float = 100;
var lowArrows = false;

function Start () {
	numArrows = GuiLevel2.Instance.numArrows;
}

function Update () {
	if( Input.GetButtonDown("Fire1"))
	{
		if(numArrows > 0) {
			var clone : Rigidbody = Instantiate(arrow, transform.position, transform.rotation);	// this makes arrow appear
			
			Physics.IgnoreCollision(clone.collider, transform.root.collider);
			
			clone.AddForce( force * transform.forward);	// make ball move. Apply force in the forward direction by amount "force"
			
			numArrows--;
			GuiLevel2.Instance.numArrows--;
		}
		
		if(numArrows < 6) {
		
			if(!lowArrows) {
				GuiLevel2.Instance.SetMessage("I'm running low on arrows!");
			}
			
			lowArrows = true;
		}
	
	
	}

}