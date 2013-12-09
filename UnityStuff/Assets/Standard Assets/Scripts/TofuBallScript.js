
var explosionEffect : GameObject;


function OnCollisionEnter()
{
	Instantiate(explosionEffect, transform.position, Quaternion.identity);
	
	Destroy(gameObject);

}