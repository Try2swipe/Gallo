require([
        'jquery',
        'Magento_Customer/js/customer-data',
        'jquery/jquery.cookie',
        'domReady!'
    ], function ($, customerData) {
        let swaction=true;
        $(document).ajaxComplete(function(event, xhr, settings) {
            if ($("#search_autocomplete").length && swaction) {
                $("#search_autocomplete").click(function(){
                    var date = new Date();
                    var minutes = 5;
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    $.cookie('typesearch', '', {path: '/', expires: -1}); 
                    $.cookie('typesearch', 'bar', {expires: date}); 
                    $.cookie('typesearch', true); 

                });
                swaction=false;
            }
        });
        let url = window.location.origin;
        url = url+"/adobelaunch/adobelaunch/finishdeleteproduct";
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json'
        })
        .done(function (response) {
            if (response.data !== undefined) {
                let data = response.data;
                window.adobeDataLayer = window.adobeDataLayer || [];
                window.adobeDataLayer.push(
                    {
                        "event" : "scRemove",
                        "eCommerce": {
                            "product" : {
                                "name" : data.name,
                                "sku" : data.sku,
                                "price" : data.price,
                                "currency" : data.currency,
                                "category" : data.category
                            }
                        }
                    }
                );
                const event = new CustomEvent('scRemove',
                    {
                        "detail": {
                            "eCommerce": {
                                "product" : {
                                    "name" : data.name,
                                    "sku" : data.sku,
                                    "price" : data.price,
                                    "currency" : data.currency,
                                    "category" : data.category
                                }
                            }
                        }
                    }
                );
                $('body')[0].dispatchEvent(event);
            }
        })
        .fail(function (error) {
        });

        if ($(".form-login .action.register").length) {
            $(".form-login .action.register").click(function(){
                let origin="Ingreso de Usuarios";
                window.adobeDataLayer = window.adobeDataLayer|| [];
                window.adobeDataLayer.push(
                    {
                        "event" : "userSignIn",
                        "User": {
                            "signinInfo" : {
                                "origin": origin
                            }
                        }
                    }
                );
                const event = new CustomEvent('userSignIn',
                    {
                        "detail": {
                            "signinInfo" : {
                                "origin": origin
                            }
                        }
                    }
                );
                $('body')[0].dispatchEvent(event);
            });
        }

        if ($(".subscribe").find("button[type='submit']").length){

            let btn = $(".subscribe").find("button[type='submit']").clone();
            $(".subscribe").find("button[type='submit']").css({'display':'none'});
            btn.attr("id","btnadobenewletter");
            btn.attr("type","button");
            $(".subscribe").find("button[type='submit']").parents(".actions").append(btn);
            btn.click(function(e){
                btn.text("Enviando...");
                let bread = "";
                if ($("body").hasClass("cms-home")) {
                    bread = "Home";
                }
                if ($("body").hasClass("catalog-category-view")) {
                    bread = "Categoria";
                }
                if ($("body").hasClass("catalog-product-view")) {
                    bread = "Producto";
                }
                if (bread=="") {
                    bread = $(document).attr('title');
                }
                window.adobeDataLayer = window.adobeDataLayer || [];
                window.adobeDataLayer.push(
                    {
                        "event" : "emailSignUp",
                        "Behavior": {
                            "newsletter" : {
                                "pageType" : bread,
                                "location" : "Footer"
                            }
                        }
                    }
                );
                const event = new CustomEvent('emailSignUp',
                    {
                        "detail": {
                            "Behavior": {
                                "newsletter" : {
                                    "pageType" : bread,
                                    "location" : "Footer"
                                }
                            }
                        }
                    }
                );
                $('body')[0].dispatchEvent(event);
                $(".subscribe").find("button[type='submit']").trigger("click");
            });
        }
    });
