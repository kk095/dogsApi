jQuery(function ($) {
    let breed;
    let subbreed=0;
   
    $(".images").ajaxStart(function() {
        $( this ).css("backgroundColor","grey");
        console.log("start");
    })
    .ajaxStop(function() {
        $( this ).css("backgroundColor","red");
        console.log("complete");
    });
    $(".get-images").button();
    $("#subbreed").selectmenu();
    $("#subbreed").selectmenu("disable");
    $.get("https://dog.ceo/api/breeds/list/all", function (data) {
        $.each(data.message, function (breed, arr) {
                $(document.createElement("option")).html(breed).appendTo($("#breed"));
        })
        $("#breed").selectmenu();

    })
    
    $( "#breed" ).selectmenu({
        select: function( event, ui ) {
            $("#subbreed").selectmenu("disable");
            breed =ui.item.value;
            $(".images").empty();
            $.get(`https://dog.ceo/api/breed/${breed}/list`,function(data){
                if(data.message.length!==0){
                    $("#subbreed").empty();
                    $("#subbreed").selectmenu("enable");
                    $("#subbreed").append($('<option>',{
                        value:0,
                        text: 'Choose subbreed'
                    }))
                    $.each(data.message,function(idx,val){
                        $("#subbreed").append($('<option>',{
                            value:val,
                            text:val
                        }))
                    })
                    $("#subbreed").selectmenu("refresh");
                }
            })
        }
      });
    
    $("#subbreed").selectmenu({
        select:function(event,ui){
            subbreed=ui.item.value;
            $(".images").empty();
        }
    })
      
    $(".get-images").click(function(){
        $(".images").empty();
        
        if(subbreed==0){
            BreedImages();
        }
        else{
            subbreedImages();
        }
    })

    function subbreedImages(){
        $.ajax({
            url:`https://dog.ceo/api/breed/${breed}/${subbreed}/images`,
   
        })
        .done(function(data){
            $.each(data.message,function(idx,val){
                $(document.createElement("div")).css({
                    width:'200px',
                    height:'200px',
                    background:`url(${val})`,
                    backgroundPosition:'center',
                    backgroundSize:"contain",
                    margin:"5px 5px"
                }).appendTo($(".images"))
            })
        })
        .fail(function(){
            $(document.createElement("div")).css({
                width:'auto',
                height:'auto',
                color:'orangered',
                fontSize:'2.5rem',
                margin:"5px 5px"
            }).html("something wrong!...<br> try again...").appendTo($(".images"))
        })
    }

    function BreedImages(){
        $.ajax({
            url:`https://dog.ceo/api/breed/${breed}/images`,
   
        })
        .done(function(data){
            $.each(data.message,function(idx,val){
                $(document.createElement("div")).css({
                    width:'200px',
                    height:'200px',
                    background:`url(${val})`,
                    backgroundPosition:'center',
                    backgroundSize:"contain",
                    margin:"5px 5px"
                }).appendTo($(".images"))
            })
        })
        .fail(function(){
            $(document.createElement("div")).css({
                width:'auto',
                height:'auto',
                color:'orangered',
                fontSize:'2.5rem',
                margin:"5px 5px"
            }).html("something wrong!...<br> try again...").appendTo($(".images"))
        })
    }
    
})