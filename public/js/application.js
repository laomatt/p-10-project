$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()


var ID_array=["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48","51","52","53","54","55","56","57","58","61","62","63","64","65","66","67","68","71","72","73","74","75","76","77","78","81","82","83","84","85","86","87","88"]
var first_row=["81","82","83","84","85","86","87","88"]
var last_row=["11","12","13","14","15","16","17","18"]
var first_two_rows = ["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28"]
var first_three_rows =["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38"]
var first_four_rows =["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48"]
var first_five_rows =["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48","51","52","53","54","55","56","57","58"]
var first_six_rows =["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48","51","52","53","54","55","56","57","58","61","62","63","64","65","66","67","68"]

var levels=[first_two_rows, first_three_rows, first_four_rows, first_five_rows, first_six_rows].reverse();
//game difficulty controllers
var game_pace=1000;
var current_level=levels[0];
//game difficulty controllers

var alpha="1234567890!".split("")
var player_score=0
var word=""
var curr=[]
var current=""
window.onload = load;
$(document).keydown(function(event) {
   if(event.keyCode==13)
    {
      submit()
    }
});

//my load-up function
var time_inc=0
 function load(){
        if(time_inc<ID_array.length){
        td=document.getElementById(ID_array[time_inc])
        if(current_level.indexOf(ID_array[time_inc])<0)
            {
              td.innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
              td.className = "active"
              if(td.innerHTML=="!"){
                      td.className="selected"
                    }
            }
        else
            {
              td.innerHTML=""
              td.className = "letter"
            }

        td.addEventListener("click",function(){
        if(((current=="")||(parseInt(current)+1==parseInt(this.id))||(parseInt(current)-1==parseInt(this.id))||(parseInt(current)+10==parseInt(this.id))||(parseInt(current)-10==parseInt(this.id))||((parseInt(current)-9==parseInt(this.id)))||((parseInt(current)-11==parseInt(this.id)))||((parseInt(current)+9==parseInt(this.id)))||((parseInt(current)+11==parseInt(this.id))))&&(curr.indexOf(this.id)<0)){
                  this.className="selected"
                  word+=this.innerHTML
                  current=this.id
                  curr.push(this.id)
              }
            })
        shake_side_ways(ID_array[time_inc])
        time_inc+=1
        setTimeout(load,20)
        }

  }

  //shake sideways
var shake_side_ways = function(indexID){
  var initial=0
  var incre=0
  quibble()
    function quibble(){
      if(incre<20)
      {
        if(incre%2==0)
          {
            initial+=5
          }
        else
          {
            initial-=5
          }
        document.getElementById(indexID).style.top=initial+"%"
        incre+=1
        setTimeout(quibble,20)
      }
    }
}

function return_button(event){
  if(event.keyCode==13)
    {
      submit()
    }
  if (event.keyCode==8)
    {
      reset_colors()
    }
}

 function check_if_correct(input){
  output=[]
  for(var i=0; i<input.length-1; i++){
      if(parseInt(input[i])+1 == parseInt(input[i+1]))
        {output.push("a")}
      else if(parseInt(input[i])-1 == parseInt(input[i+1]))
        {output.push("a")}
      else
        {output.push("b")}
    }
// return output
    if (output.indexOf("b")>-1)
      {return false}
    else
      {return true}
}




//submit, evaluates a potential score
var submit = function(){
    if(word=="!")
    {
      console.log("!")
      console.log(word)
      console.log(curr)
      da_bomb(curr[0])
      word=""
      current=""
      curr=[]
      document.getElementById("fff").innerHTML="rtgr"+curr
      drop_blox()
    }
    else if((check_if_correct(word) == true) && (word.length>1))
    {
      console.log("some number")
      console.log("word")
      console.log(curr)
      new_score = player_score+word.length
      slide_score()
      for (var t = 0; t < curr.length; t++)
        {
          explode(curr[t])
          document.getElementById(curr[t]).innerHTML=""
          document.getElementById(curr[t]).className="letter"
        }
      word=""
      current=""
      curr=[]
      drop_blox()
    }
    else
    {
    reset_colors(curr)
    }
  }

  //another recursive funtion,  THIS FUNCTION ANIMATES THE SCORE TABLE
var slide_score = function(){
      if(player_score!=new_score)
      {
        player_score+=1
        document.getElementById("score").innerHTML=player_score
        setTimeout(slide_score,50)
      }
      else
      {
        document.getElementById("score").innerHTML=player_score
      }
  }
var difficulty=10

var slide_down = function(indexID){
    var incre=0
    quibble()
      function quibble(){
        if(incre<=difficulty)
        {
          document.getElementById(indexID).style.top=(difficulty-incre)+"%"
          incre+=1
          setTimeout(quibble,20)
        }
      }
}

function explode(id){
  var incre=0
  var maxi=10
   take_down()
    function take_down(){
      if(incre<=maxi)
        {
          if(incre==maxi){
          document.getElementById(id).style.top="0px"
          }
          else{
          document.getElementById(id).style.top=incre+"px"
          incre+=1
          setTimeout(take_down,20)
          }
        }
    }
}


function check_for_loosing_condition(){
    for(var d in last_row){
      if(document.getElementById(last_row[d]).className!="letter")
          {
            return true;
          }
    }
    return false
}

setInterval(generate_falling_blox,game_pace);

function generate_falling_blox(){
  if(check_for_loosing_condition()==false)
  {
    var id_to_populate = last_row[Math.floor(Math.random()*last_row.length)]

    var block_to_fall=document.getElementById(id_to_populate)
    block_to_fall.innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
    block_to_fall.className="active"
      if(block_to_fall.innerHTML=="!"){
        block_to_fall.className="selected"
      }
    check_for_loosing_condition();
    drop_blox();
  }
  else
  {
    game_over();
  }
}

function da_bomb(id_to_go)//input is an integer-string
{
        var center=parseInt(id_to_go)
        var blast_area=[center, center+1, center-1, center+10, center-10, center-9, center-11, center+9, center+11]
        for(var j in blast_area)
        {
          if(ID_array.indexOf(blast_area[j].toString()) >= 0)
          {
          explode_me_please(blast_area[j].toString())
          }
        }
}

function explode_me_please(id){

  var incre=0
  var maxi=10
   take_down()
    function take_down(){
      if(incre<=maxi)
        {
          if(incre==maxi){
          document.getElementById(id).style.top="0px"
          }
          else{
          document.getElementById(id).style.top=incre+"px"
          incre+=1
          setTimeout(take_down,10)
          }
        }
        document.getElementById(id).className="letter"
        document.getElementById.innerHTML=""
    }

}

function game_over(){
  for(var p in ID_array){
    document.getElementById(ID_array[p]).className="selected"
    document.getElementById(ID_array[p]).innerHTML=""
  }
}




function drop_blox(){
   var g=0
    the_loop()
    function the_loop()
      {
        if(g<ID_array.length)
          {
          var t=0
          the_drop()
                function the_drop(){
                  if(t<ID_array.length)
                    {
                        if(document.getElementById(ID_array[t]).className=="letter")
                        {
                          if((last_row.indexOf(ID_array[t])>=0)||(document.getElementById(ID_array[t-8]).className=="letter"))
                          {
                              document.getElementById(ID_array[t]).innerHTML=""
                              // document.getElementById(ID_array[t]).className=document.getElementById(ID_array[t-8]).className
                              document.getElementById(ID_array[t]).className="letter"
                          }
                          else
                          {
                              document.getElementById(ID_array[t]).innerHTML=document.getElementById(ID_array[t-8]).innerHTML.toString();
                              // document.getElementById(ID_array[t]).className="active";
                              document.getElementById(ID_array[t]).className=document.getElementById(ID_array[t-8]).className;
                              document.getElementById(ID_array[t-8]).innerHTML=""
                              document.getElementById(ID_array[t-8]).className="letter"
                          }
                          slide_down(ID_array[t])
                        }
                      t+=1
                      setTimeout(the_drop,20)
                    }
                  }
                  g+=1
                  setTimeout(the_loop,300)
                }
        }

}


function reset_colors(inde){
      word=""
      current=""
      for (var t = 0; t < inde.length; t++)
      {
        document.getElementById(inde[t]).className="active"
      }
      curr=[]
  }




  });