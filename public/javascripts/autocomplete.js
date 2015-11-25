var suggestCount = 0;
var inputInitialValue = '';
var suggestSelected = 0;
var quantityResults = 0;

$(document).ready(function(){
    var searchBox = $("#search_box");
    var searchResult = $("#search_result");
    searchBox.keyup(function(I) {
        // определяем какие действия нужно делать при нажатии на клавиатуру
        switch(I.keyCode) {
            // игнорируем нажатия на эти клавишы
            case 13: case 27: case 37: case 38: case 39: case 40:
                break;

            default:
                if($(this).val().length>2){
                    inputInitialValue = $(this).val();
                    $.getJSON('./task.json', {}, function(companyData){
                        suggestCount = companyData.length;
                        console.log(suggestCount);
                        if(suggestCount > 0){
                            searchResult.html("").show();
                            for(var i in companyData){
                                var company = (companyData[i]).company;
                                var companyStr = company.slice(0, inputInitialValue.length);
                                if(inputInitialValue == companyStr){
                                    quantityResults += 1;
                                    searchResult.append('<div class="advice_variant">' + company + '</div>');
                                    //searchResult.append('<a href="http://localhost:3000/?query=' + (companyData[i]).company + '"><div class="advice_variant">' + (companyData[i]).company + '</div></a>');
                                }

                            }
                        }
                        console.log('len' + quantityResults);
                    });
                }
                break;
        }
    });
    //считываем нажатие клавишь, уже после вывода подсказки
    searchBox.keydown(function(I){
        switch(I.keyCode) {
            // по нажатию клавишь прячем подсказку
            case 13: // enter
                //submit();
                break;
            case 27: // escape
                searchResult.hide();
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
                if(quantityResults){
                    //делаем выделение пунктов в слое, переход по стрелочкам
                    key_activate( I.keyCode-39 );
                }
                break;
        }
    });

    // делаем обработку клика по подсказке
    $('#search_result').on('click', 'div', function(){
        // ставим текст в input поиска
        console.log('click');
        console.log($(this).text());
        $('#search_box').val($(this).text());
        // прячем слой подсказки
        searchResult.fadeOut(350).html('');
    });

    // если кликаем в любом месте сайта, нужно спрятать подсказку
    $('html').on('click', function(){
        searchResult.hide();
    });
    // если кликаем на поле input и есть пункты подсказки, то показываем скрытый слой
    searchBox.on('click', function(event){
        //alert(suggestCount);
        if(suggestCount)
            searchResult.show();
        event.stopPropagation();
    });
});

function key_activate(n){
    var searchBox = $("#search_box");
    var searchResultDiv = $('#search_result div');
    searchResultDiv.eq(suggestSelected-1).removeClass('active');

    if(n == 1 && suggestSelected < quantityResults){
        suggestSelected++;
    }else if(n == -1 && suggestSelected > 1){
        suggestSelected--;
    }

    if( suggestSelected > 0){
        searchResultDiv.eq(suggestSelected-1).addClass('active');
        searchBox.val( searchResultDiv.eq(suggestSelected-1).text() );
        console.log(searchResultDiv.eq(suggestSelected-1).text());
    } else {
        searchBox.val( inputInitialValue );
    }
}