

//var blur : BlurEffect;
//var coloreffect : ColorCorrectionCurves;
var waterJump : float = 6;

function OnTriggerEnter( col : Collider )
{

	var charMotor : CharacterMotor;
	
	charMotor = col.GetComponent("CharacterMotor");
	
	charMotor.jumping.extraHeight = waterJump;
	
	//blur.enabled = true;
	//coloreffect.enabled = true;

}

function OnTriggerExit( col : Collider )
{

	var charMotor : CharacterMotor;
	
	charMotor = col.GetComponent("CharacterMotor");
	
	charMotor.jumping.extraHeight = 1;	// reset the extra height to the original value
	
	//blur.enabled = false;
	//coloreffect.enabled = false;

}