// alert("hello");
var data;
var count;
url = window.location.href;
url_arr = url.split("/");
url_first = url_arr[url_arr.length-1].split("?");
var price={};

// console.log(url_first[1]);

if(url_first[0] == "index.html"){


$(function(){
  
    $("#lblCartCount").text(total());
    $.ajax({
        url: "https://fakestoreapi.com/products",

    })
    .done(function( data ) {
       data.forEach(item => {
        console.log(item);
        $(".container").append("<div class='itemdiv'><img src='"+`${item["image"]}`+"'><p>"+
        `${item["title"]}`+"</p><p>$"+`${item["price"]}`+
        "<input class='btn addcartmain' type='button' value='+Add' onclick='add(this.name)'  name='"+`${item["id"]}`+
        "'> <a href='item.html?id="+`${item["id"]}`+"'><input class='addcartmain' type='button' value='view' name='"+`${item["id"]}`+"'></a></p></div>");
       });
        });

          

});




}
else if(url_first[0] == "item.html"){
    
    var id= url_first[1].split("=")[1];
    
    $("#lblCartCount").text(total());
console.log(id);
$.ajax({
    url: "https://fakestoreapi.com/products/"+id,

})
.done(function( item ) {
    console.log(item);
   
    $(".container2").append("<div class='itemdiv2'><div class='div1'><img src='"+`${item["image"]}`+
    "'></div><div class='div2'><p class='title-item'>"+`${item["title"]}`+"</p><p>"+`${item["description"]}`+
    "</p><p >Ratings: <span style='color: #6195D3'>"+`${item["rating"]["rate"]}`+
      " <i class='fa fa-star' style='color: #c67605;'></i> ("+`${item["rating"]["count"]}`+")</span></p><p class='price-item'>$"+`${item["price"]}`+
    "</p><input class='btn addcart' type='button' value='Add to Cart' onclick='add(this.name)' name='"+`${item["id"]}`+
    "'> </div></div>");
  
    });
}
else if(url_first[0] == "cart.html"){
    count=0;
    console.log(localStorage);
    for(i=0;i<localStorage.length;i++){
        count+=parseInt(localStorage.getItem(localStorage.key(i)));
        id=localStorage.key(i);
        var val=localStorage.getItem(localStorage.key(i));
       
        $.ajax({
            url: "https://fakestoreapi.com/products/"+id,
            success: function(item){
                console.log(typeof item["id"].toString());
                price[item["id"].toString()] = item["price"];
                $(".container2").append("<div class='itemdiv2'><div class='div1'><img src='"+`${item["image"]}`+
            "'></div><div class='div2'><p class='title-item'>"+`${item["title"]}`+`${item["id"]}`+"   </p><p>"+`${item["description"]}`+
            "</p><p >Ratings: <span style='color: #6195D3'>"+`${item["rating"]["rate"]}`+
              " <i class='fa fa-star' style='color: #c67605;'></i> ("+`${item["rating"]["count"]}`+")</span></p><p class='price-item'>$"+`${item["price"]}`+
            "</p><input class='btn ' type='text' value='"+localStorage.getItem(item["id"])+"' onchange='update(this.id)' id='"+`${item["id"]}`+
            "'> <input class='btn remove' type='button' value='Remove'  name='"+`${item["id"]}`+
            "'></div></div>");
            },
            async:false
        });
        
    }
    $("#lblCartCount").text(total());
    // console.log(price);
    $("#itemcount").text(total()).delay(1000);

    $("#totalprice").text("$ "+totalprice());
}


function add(name){
        
    if(localStorage.getItem(name)==null){
        localStorage.setItem(name,1);
    }
    else{
        localStorage.setItem(name,parseInt(localStorage.getItem(name))+1);
    }
    console.log(localStorage);
   count=0;
    
    $("#lblCartCount").text(total());
    console.log(count);
}

function update(name){
    val=$("#"+name).val();
    console.log(name,typeof name);
    if(val=="0"){
        localStorage.removeItem(name);

        location.reload().delay(1000);
    }
    console.log(val,name);
    localStorage.setItem(name,val)
    $("#lblCartCount").text(total());
    $("#itemcount").text(total());
    $("#totalprice").text("$ "+totalprice());
}


function total(){
    count=0;
    for(i=0;i<localStorage.length;i++){
        count+=parseInt(localStorage.getItem(localStorage.key(i)));
    }
    return count;
}

function totalprice(){
    val=0;
    for(i=0;i<localStorage.length;i++){
        // console.log(price.);
        // console.log(price["1"],typeof price);
        val+=parseInt(localStorage.getItem(localStorage.key(i))) * parseFloat(price[localStorage.key(i)]) ;
    }
    return val;

}

$("#proceed").on("click",function(){
    localStorage.clear();
    window.location.href="index.html";
})

$(".remove").click(function(){
 id= this.name;
 localStorage.removeItem(id);
location.reload();
})