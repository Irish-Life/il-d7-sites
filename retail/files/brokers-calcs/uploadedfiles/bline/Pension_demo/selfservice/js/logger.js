var logging = true;
var consoleCounter = 0;
function log(message, type)
{
	try
	{
		if(logging)
		{
			if(typeof(console) != "undefined")
			{
				if(typeof(type) == "undefined")
				{
					type = 'debug';
				}
				
				consoleFunction = eval('console.' + type);				
				consoleFunction('%s', consoleCounter++ + "\t" + message);
			}
			else
			{
				try {
				if(document.getElementById("consoleDiv") != null)
					document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
				} catch(e){}
			}
		}
	}
	catch(e)
	{
		// alert('Error in logger');
	}
}
function logError(message){log(message, 'error'); }
function logInfo(message){log(message, 'info'); }
function logWarn(message){log(message, 'warn'); }
function logDebug(message){log(message, 'debug'); }

function logError(message, exception) 
{
    try
	{
        if (typeof (exception) != "undefined") {
            log("\nmethod = " + message + "\n" +
                "exception.fileName = " + exception.fileName + "\n" +
                "exception.lineNumber = " + exception.lineNumber + "\n" +
                "exception.name = " + exception.name + "\n" +
                "exception.message = " + exception.message + "\n\n" +
                "exception.stack = " + exception.stack + "\n", 'error');
        }
        else {
            log(message, 'error');
        }
    }
    catch (e) 
    {
        log(message, 'error');
    }        
}