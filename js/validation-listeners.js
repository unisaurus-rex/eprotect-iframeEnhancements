/**
 * @file validation-listeners.js
 * event listeners for field validation
 */
 
function panInitEvents(){
    //blur event
    $('#accountnumber').blur( function() {
        panBlur();
    })
    //paste event
    $('#accountnumber').bind("paste", panPaste);
    
    //keypress
    $("#accountnumber").keypress(panKeyPress);
        
}

function panKeyPress(e){
    //console.log(e.key);
    var keyPressed = e.key;
    
    if(! isIneligible(keyPressed)) {
        //get pan
        var pan = $("#accountnumber").val();
        //strip of white space
        pan = stripSpaces(pan);
        
        //add keypressed
        pan = pan + keyPressed;
        
        //update dom with formatted pan
        $("#accountnumber").val( formatPan(pan) );
        
        //update card icon based on card type
        var type = detectCardTypePartial(pan);
        iconSwitch(type);
        
        return false;
    }
    else
        return false;
}

 function panBlur(){
    //get pan
    var pan = $("#accountnumber").val();
    
    //strip spaces  
    pan = stripSpaces(pan); 
    
    //validate pan
    var panErrs = panValidations( pan );
    
    //update dom
    panValidUi( panErrs );

    //update card icon based on card type
    var type = detectCardTypePartial(pan);
    iconSwitch(type);
    
    //get cvv
    var cvc = $("#cvc").val();
    
    //if cvc has been filled out validate it and update dom
    if (cvc){
        var cvcErrs = cvcValidations(pan, cvc)
        cvcValidUi(cvcErrs);
    }     
 }
 
 function panPaste(e)
 {
    //get pan
    var pan = e.originalEvent.clipboardData.getData('text');
    
    //strip spaces  
    pan = stripSpaces(pan); 

    //update dom with formatted pan
    $("#accountnumber").val( formatPan(pan) );
    
    //validate pan
    var panErrs = panValidations( pan );
    
    //update dom
    panValidUi( panErrs );
    
    //update card icon based on card type
    var type = detectCardTypePartial(pan);
    iconSwitch(type);
    
    //get cvv
    var cvc = $("#cvc").val();
    
    if(cvc){
        //if cvv is not empty run cvv validations
        var cvcErrs = cvcValidations(pan, cvc)
        
        //update dom
        cvcValidUi(cvcErrs);            
    }
    //do not paste text from clipboard
    return false;
}

panInitEvents();
