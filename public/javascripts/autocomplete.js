var inputValueLength = 0;
var suggestSelected = 0;
var quantityOfResults = 0;
var inputValue = '';

$(document).ready(function(){
    var $searchBox = $("#search_box");
    var $searchResult = $("#search_result");
    $searchBox.keyup(function(I) {
        if ((I.keyCode >= 48) && (I.keyCode <= 111)) {
            inputValue = $(this).val();
            inputValue = inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
            inputValueLength = $(this).val().length;
            if (inputValueLength > 2) {
                $searchResult.html("");
                $.getJSON('./task.json', {}, function(companyData) {
                    for (var i in companyData) {
                        var company = (companyData[i]).company;
                        var companyStr = company.slice(0, inputValue.length);
                        if(inputValue == companyStr){
                            $searchResult.show();
                            $searchResult.append('<div class="advice_variant">' + company + '</div>');
                            //$searchResult.append('<a href="http://localhost:3000/?query=' + (companyData[i]).company + '"><div class="advice_variant">' + (companyData[i]).company + '</div></a>');
                        }
                    }
                    quantityOfResults = $searchResult.children().length;
                    console.log(quantityOfResults);
                });
            }
        }
    });
    //считываем нажатие клавишь, уже после вывода подсказки
    $searchBox.keydown(function(I){
        switch(I.keyCode) {
            // по нажатию клавишь прячем подсказку
            //case 13: // enter
            //    break;
            case 27: // escape
                $searchResult.hide();
                return false;
                break;
                //console.log('ent');
                //console.log($(this).text());
                //$('#search_box').val($(this).text());
                //break;
            // делаем переход по подсказке стрелочками клавиатуры
            case 38: // стрелка вверх
            case 40: // стрелка вниз
                I.preventDefault();
                if(quantityOfResults){
                    //делаем выделение пунктов в слое, переход по стрелочкам
                    key_activate( I.keyCode-39 );
                }
                break;
        }
    });

    // делаем обработку клика по подсказке
    $searchResult.on('click', 'div', function(){
        $('#search_box').val($(this).text());
        //$.get('http://localhost:3000/?query=' + $(this).text());
    });

    // если кликаем в любом месте сайта, нужно спрятать подсказку
    $('html').on('click', function(){
        $searchResult.hide();
    });
    // если кликаем на поле input и есть пункты подсказки, то показываем скрытый слой
    $searchBox.on('click', function(e){
        if(quantityOfResults) $searchResult.show();
        e.stopPropagation();
    });
});

function key_activate(n){
    var $searchBox = $("#search_box");
    var $searchResultDiv = $('#search_result div');
    $searchResultDiv.eq(suggestSelected-1).removeClass('active');

    if(n == 1 && suggestSelected < quantityOfResults){
        suggestSelected++;
    }else if(n == -1 && suggestSelected > 1){
        suggestSelected--;
    }

    if( suggestSelected > 0){
        $searchResultDiv.eq(suggestSelected-1).addClass('active');
        $searchBox.val( $searchResultDiv.eq(suggestSelected-1).text() );
    } else {
        $searchBox.val( inputValue );
    }
}