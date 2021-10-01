$(document).ready(function(){
    loadDataJquery()
});

//dialog
function dialogProduct(){
    $( function() {
        $( "#dialog" ).dialog({
            width: 740,
            height: 600
        });
      } );
}
function selectPic(){
    $('body').on('click', '.img-producto', function(event){
        event.preventDefault();
        var pic= $(this).attr('src');
        var dialog_html= "";
        dialog_html= itemTemplateDialog(pic);
        $("#dialog").html(dialog_html)
        dialogProduct();
    });
    
}
function itemTemplateDialog(pic){
        return `
        <div id="dialog" title="">
            <div id="product-img"> 
                <img class="productPic" id="dialogImg" src="${pic}" alt=""></img>
            </div>
        </div>
        `
    ;
}
//loadData
function loadDataJquery(){
    $.ajax({
        url: 'https://rifer.com.co/pruebafiles/arreglos_florales_json.php',
        success: function(result){
            feedContentJqueryFeatured(result.featured)
            feedContentJqueryNewArrival(result.new)
            feedContentJqueryMostPopular(result.popular)
        },
        error: function(xhr){
            alert("Ocurrió un error: "+ xhr.status + "" + xhr.statusText)
        }
    });
}

//Featured
function feedContentJqueryFeatured(dataJson){
    var content_html= "";
    for (let index = 0; index < dataJson.length; index++) {
        content_html+= itemTemplateFeatured(index, dataJson[index]);
    }
    $(".featured").html(content_html)
}
function itemTemplateFeatured(i, dataitem){
    return `
        <div class="product-item" id="product-${i}">
            <span class="name">${dataitem.name}</span>
            <img class="img-producto" id="img-${i}" src="${dataitem.pic}" alt="${dataitem.description}" onclick="selectPic()" onmouseover="animatedScale('#img-${i}',1.2)" onmouseout="animatedScale('#img-${i}',1)">
            <div class="mix">
                <span class="price">$ ${dataitem.price}</span>
                <button class="order-btn" onclick="addCart()">Order Now</button>
            </div>
    </div>
    `;
}
//NewArrival
function feedContentJqueryNewArrival(dataJson){
    var content_html= "";
    for (let index = 0; index < dataJson.length; index++) {
        content_html+= itemTemplateNewArrival(index, dataJson[index]);
    }
    $(".NewArrival").html(content_html)
}
function itemTemplateNewArrival(i, dataitem){
    return `
        <div class="product-item" id="product-${i}">
            <span class="name">${dataitem.name}</span>
            <img class="img-producto" id="imgNA-${i}" src="${dataitem.pic}" alt="${dataitem.description}" onclick="selectPic()" onmouseover="animatedScale('#imgNA-${i}',1.2)" onmouseout="animatedScale('#imgNA-${i}',1)">
            <div class="mix">
                <span class="price">$ ${dataitem.price}</span>
                <button class="order-btn" onclick="addCart()">Order Now</button>
            </div>
    </div>
    `;
}
//Most Popular
function feedContentJqueryMostPopular(dataJson){
    var content_html= "";
    for (let index = 0; index < dataJson.length; index++) {
        content_html+= itemTemplateMostPopular(index, dataJson[index]);
    }
    $(".MostPopular").html(content_html)
}
function itemTemplateMostPopular(i, dataitem){
    return `
        <div class="product-item" id="product-${i}">
            <span class="name">${dataitem.name}</span>
            <img class="img-producto" id="imgMP-${i}" src="${dataitem.pic}" alt="${dataitem.description}" onclick="selectPic()" onmouseover="animatedScale('#imgMP-${i}',1.2)" onmouseout="animatedScale('#imgMP-${i}',1)">
            <div class="mix">
                <span class="price">$ ${dataitem.price}</span>
                <button class="order-btn" onclick="addCart()">Order Now</button>
            </div>
    </div>
    `;
}
// animation Scale
function animatedScale(obj, scale) {
    anime({
        targets: obj,
        scale: scale,
        duration: 1500
    });
}
// anadir al carrito
var cart=0;
function addCart() {
    var content_html="";
    cart+=1;
    content_html+= templateCart(cart);
    $(".cart-link").html(content_html);
}
function templateCart(bag){
    return `
        <a href="#">Cart(${bag})</a>
    `;
}
