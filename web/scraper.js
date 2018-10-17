var start;

$( document ).ready(function() {
    //LoopFct();
	
	//Infinite(start);
	//Scrape(start);
	start = document.getElementById("ipt").value;
});

async function Infinite()
{
	// var str = successor(start);
	// console.log(str);
	// Scrape(start);
	// Infinite(str);
	
	//document.getElementById("insert").innerHTML = "";
	
	var code = start;
	var cpt = 0;
	
	for (var i = 0; i <= 10; i++) 
	{ 
		cpt += 1;
		if(cpt == 9)
		{
			sleep(2000);
			cpt = 0;
		}
		await Scrape(code);
		code = successor(code);
	}
	start = code;
}

function sleep(delay) {
	console.log("sleep");
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function LoopFct ()
{
	var max = 100;
	var alphaStart = 97;
	var alphaEnd = 122;
	
	var code;
	for (var i = 0; i <= alphaEnd; i++) 
	{ 
		if(i >= 97)
		{
			Scrape(String.fromCharCode(i));
		}
		else
		{
			Scrape(i);
		}
		if(code.length = 1)
		{
			code = i.toString;
		}
		
		if(i == 9)
		{
			i = alphaStart;
		}
	}	
}

async function Scrape(code)
{
	var StartingPoint = ""
	//var url = "https://cors-anywhere.herokuapp.com/" + "https://prnt.sc/" 
	//var url = "https://thingproxy.freeboard.io/fetch/" + "https://prnt.sc/" 
	//var url = https://api.codetabs.com/cors-proxy/ + "https://prnt.sc/" 
	var url = "https://api.codetabs.com/v1/proxy/" + "https://prnt.sc/" 

	url = url + code;
	console.log(url);

	// $.get(url, function(response) 
	// {
		// console.log("here");
		// var index = response.indexOf('src="https://image.prntscr.com/image/');
		// var str = response.substr(index, 100);
		// str = str.substr(5);
		// var index2 = str.indexOf('"');
		// var link_img = str.substr(0,index2);
		// var strHtml = '<a href="#"><img src="' + link_img + '"></a>';
		// document.getElementById("insert").innerHTML += strHtml;
	// });
	
	$.ajax({
     async: false,
     type: 'GET',
     url: url,
     success: function(response) 
		 {
			 console.log("response:" + response);
			var index = response.indexOf('src="https://image.prntscr.com/image/');
			console.log("index" + index);
			var str = response.substr(index, 100);
			str = str.substr(5);
			console.log("str" + str);
			var index2 = str.indexOf('"');
			var link_img = str.substr(0,index2);
			console.log("link_img" + link_img);
			var strHtml = '<a href="#"><img src="' + link_img + '"></a>';
			console.log(strHtml);
			document.getElementById("insert").innerHTML += strHtml;
		 }
	});
}

function successor(str) 
{
	var alphabet = 'abcdefghijklmnopqrstuvwxyz',
		length = alphabet.length,
		result = str,
		i = str.length;

	while(i >= 0) {
		var last = str.charAt(--i),
			next = '',
			carry = false;

		if (isNaN(last)) {
			index = alphabet.indexOf(last.toLowerCase());

			if (index === -1) {
				next = last;
				carry = true;
			}
			else {
				var isUpperCase = last === last.toUpperCase();
				next = alphabet.charAt((index + 1) % length);
				if (isUpperCase) {
					next = next.toUpperCase();
				}

				carry = index + 1 >= length;
				if (carry && i === 0) {
					var added = isUpperCase ? 'A' : 'a';
					result = added + next + result.slice(1);
					break;
				}
			}
		}
		else {
			next = + last + 1;
			if(next > 9) {
				next = 0;
				carry = true;
			}

			if (carry && i === 0) {
				result = '1' + next + result.slice(1);
				break;
			}
		}

		result = result.slice(0, i) + next + result.slice(i + 1);
		if (!carry) {
			break;
		}
	}
	return result;
}