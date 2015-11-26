"use strict";
$(document).ready(function(){
    var inputValueLength = 0,
        suggestSelected = 0,
        quantityOfResults = 0,
        inputValue = '',
        $searchBox = $("#js_search_box"),
        $searchResult = $("#js_search_result");
    $searchBox.keyup(function(I) {
        if ((I.keyCode >= 48) && (I.keyCode <= 111)) {
            inputValue = $(this).val();
            inputValue = inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
            inputValueLength = $(this).val().length;
            if (inputValueLength > 2) {
                $searchResult.html("");
                $.getJSON('./task.json', {}, function(companyData) {
                    $searchResult.append('<div class="js_advice_variant">' + inputValue + '</div>');
                    for (var i in companyData) {
                        var company = (companyData[i]).company;
                        var companyStr = company.slice(0, inputValue.length);
                        if(inputValue == companyStr){
                            $searchResult.show();
                            $searchResult.append('<div class="js_advice_variant">' + company + '</div>');
                            //$searchResult.append('<a href="http://localhost:3000/?query=' + (companyData[i]).company + '"><div class="js_advice_variant">' + (companyData[i]).company + '</div></a>');
                        }
                    }
                    quantityOfResults = $searchResult.children().length;
                });
            }
        }
    });
    $searchBox.keydown(function(I){
        switch(I.keyCode) {
            case 27: // escape
                $searchResult.hide();
                return false;
                break;
            case 38: // стрелка вверх
            case 40: // стрелка вниз
                I.preventDefault();
                if(quantityOfResults){
                    key_activate( I.keyCode-39 );
                }
                break;
        }
    });

    $searchResult.on('click', 'div', function(){
        $('#js_search_box').val($(this).text());
        //$.get('http://localhost:3000/?query=' + $(this).text());
    });

    $('html').on('click', function(){
        $searchResult.hide();
    });
    $searchBox.on('click', function(e){
        if(quantityOfResults) $searchResult.show();
        e.stopPropagation();
    });

    $searchResult.mouseover(function() {
        $searchResult.find('div').removeClass('active');
    });

    function key_activate(n){
        var $searchBox = $("#js_search_box");
        var $searchResultDiv = $('#js_search_result').find('div');
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
});