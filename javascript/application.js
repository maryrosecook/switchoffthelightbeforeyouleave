function setupInitialSwitchState()
{
	if(getCookie(getSwitchStateCookieName()) == 'off')
		turnOff();
	else
		turnOn();
	
	setupCookies();
	
	var totalOff = getTotalOff();
}

function toggleSwitch(e, image)
{
	var startX = 130;
	var endX = 186;
	var startY = 107;
	var endY = 173;

	var x = e.pageX - image.offsetLeft;
	var y = e.pageY - image.offsetTop;
	
	if(x > startX && x < endX && y > startY && y < endY)
	{
		if(getCookie(getSwitchStateCookieName()) == 'on')
		{
			turnOff();
			setCookie(getLastOffCookieName(), (new Date()).getTime(), 999);
		}
		else
		{
			turnOn();
			var newConfirmedOff = parseInt(getCookie(getConfirmedOffCookieName())) + parseInt(getLastOffAddition());
			setCookie(getConfirmedOffCookieName(), newConfirmedOff, 999);
			setCookie(getLastOffCookieName(), -1, 999);
		}
	}
}

function turnOff()
{
	$('#on_image').hide();
	$('#off_image').show();
	$('body').removeClass('on');
	$('body').addClass('off');
	setCookie(getSwitchStateCookieName(), 'off', 999);
}

function turnOn()
{
	$('#on_image').show();
	$('#off_image').hide();
	$('body').removeClass('off');
	$('body').addClass('on');
	setCookie(getSwitchStateCookieName(), 'on', 999);
}

function getTotalOff()
{
	var confirmedOff = parseInt(getCookie(getConfirmedOffCookieName()));
	var lastOff = getCookie(getLastOffCookieName());
	
	var totalOff = confirmedOff;
	if(lastOff != -1)
		totalOff += getLastOffAddition();
		
	return parseInt(totalOff / 1000);
}

function getLastOffAddition() { return (new Date()).getTime() - parseInt(getCookie(getLastOffCookieName())); }

function setupCookies()
{
	if(getCookie(getConfirmedOffCookieName()) == '')
		setCookie(getConfirmedOffCookieName(), 0, 999)

	if(getCookie(getLastOffCookieName()) == '')
	{
		if(getCookie(getSwitchStateCookieName()) == 'on')
			setCookie(getLastOffCookieName(), -1, 999)
		else
			setCookie(getLastOffCookieName(), (new Date()).getTime(), 999)
	}
}

function getSwitchStateCookieName() { return 'switch'; }
function getLastOffCookieName() { return 'last_off'; }
function getConfirmedOffCookieName() { return 'confirmed_off'; }

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}