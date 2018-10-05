$('#math-img').css('width',window.innerWidth).css('height',window.innerHeight);
$(window).resize(function(){
    $('#math-img').css('width',window.innerWidth).css('height',window.innerHeight);
    
});
$(init);
var operators=['+','-','*','/'];
var operatorRandom=0;
var number1=0;
var number2=0;
var result=0;
var dogru=0;
var resultArr=[];
var resultRandom=[];
var resultRandomNumber=[];
var hesaplanan=0;
var trueSound = $("#true");
var falseSound = $("#false");
function init(){
    //Operators are created and random operator is selected
    
    operatorRandom=Math.floor(Math.random()*4);

    //Random numbers are created
    number1=Math.floor(Math.random()*9999);
    number2=Math.floor(Math.random()*9999);

    //Operators and Operands are sent to calculation function
    result=calculate(number1,operatorRandom,number2);
    dogru=result;
    //Create approximately close options 
    resultArr=[result+=2.0,result-=1.0,dogru,result-=2.0];

    //create Random results and show resultArr in the screen
    resultRandom=[];
    while(resultRandom.length < 4){
        resultRandomNumber = Math.floor(Math.random()*4) ;
        if(resultRandom.indexOf(resultRandomNumber) > -1) continue;
        resultRandom[resultRandom.length] = resultRandomNumber;
    }
    for(var i=0;i<4;i++){
        if(i==0){
            $('#option'+i).text('A) '+resultArr[resultRandom[i]]);
        }else if(i==1){
            $('#option'+i).text('B) '+resultArr[resultRandom[i]]);
        }else if(i==2){
            $('#option'+i).text('C) '+resultArr[resultRandom[i]]);
        }else if(i==3){
            $('#option'+i).text('D) '+resultArr[resultRandom[i]]);
        }
        
    }

    //Calculate function and return
    function calculate(number1,operatorRandom,number2){
        $('#question').text(number1+operators[operatorRandom]+number2+'= ? '+' İşleminin Sonucu Nedir?');
            hesaplanan=eval(number1+operators[operatorRandom]+number2);
            return hesaplanan.toFixed(1);
    }
}
//init bitiyor...

//Reset Başlıyor
    function reset(){
        
        operatorRandom=0;
        number1=0;
        number2=0;
        result=0;
        dogru=0;
        resultArr=[];
        resultRandom=[];
        resultRandomNumber=[];
        hesaplanan=0;
        for(var l=0;l<4;l++){
            
                $('#option'+l).attr('disabled',false);
                $('#option'+l).css('background-color','#F4F4D3');
            
        }
        $(init);
        $(showQuesAns);
    }
//Reset Bitiyor

//After click the options check if it is true or not. If it is true make it green else make its background red
$('.myOptions').on('click',function(){
    var myOptionsID=$(this).text();
    var myOptionsNumber=myOptionsID.split(')');
    var clickOption=myOptionsNumber[1].trim();
    
    if(clickOption==dogru){
        trueSound.trigger('play');
        $(this).css('background-color','green');
        $(this).attr('disabled',true);
        //except true answer makes other red
        for(var l=0;l<4;l++){
            if($(this).attr('id')!=$('#option'+l).attr('id')){
                $('#option'+l).attr('disabled',true);
                $('#option'+l).css('background-color','red');
            }
        }
        setTimeout(function(){
            $(reset);
        },1000);
        
    }else{      
        falseSound.trigger('play');  
        //except true answer makes other red
        for(var l=0;l<4;l++){
            myOptionsID=$('#option'+l).text();
            myOptionsNumber=myOptionsID.split(')');
            clickOption=myOptionsNumber[1].trim();
            if(dogru!=clickOption){
                $('#option'+l).attr('disabled',true);
                $('#option'+l).css('background-color','red');
            }else{
                $('#option'+l).css('background-color','green');
                $('#option'+l).attr('disabled',true);
            }
        }
        setTimeout(function(){
            $(reset);
        },1000);
    }
});
$(showQuesAns);
function showQuesAns(){
    //In the beginning; show question and results with animation one by one
    //hide question
    $('#question').hide();
    $('#question').show('slide',function(){

    },2000);
    //hide options
    for(var i=0;i<4;i++){
        $('#option'+i).hide();
    }
    //Show options with the help of animation
    for(var k=0;k<4;k++){
        $('#option'+k).delay(k*400).show('slow',function showNext(){
            $(this).next('#option'+k).show('slow',showNext);
        });
    }
}
