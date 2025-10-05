require(['jquery'], function($) {
        let timeout = setTimeout(function(){
            if ($("ul.social-networks").length) {
                $("ul.social-networks a").click(function(){
                    let urlred = $(this).attr("href");
                    let nombrered = "";
                    let facebook = '';
                    let instagram = '';
                    facebook = urlred.indexOf("facebook");
                    instagram = urlred.indexOf("instagram");

                    if (facebook > 0) {
                        nombrered = "Facebook";
                        facebook = 0;
                    } else if (instagram > 0) {
                        nombrered = "Instagram";
                        instagram = 0;
                    } else {
                        nombrered = "Youtube";
                    }

                    let URLactual = window.location.href;
                    let location="footer";
                    let origen = "";
                    if ($("body").hasClass("cms-home")) {
                        origen = "Home";
                    }
                    if ($("body").hasClass("catalog-category-view")) {
                        origen = "Categoria";
                    }
                    if ($("body").hasClass("catalog-product-view")) {
                        origen = "Producto";
                    }
                    if (origen=="") {
                        origen = $(document).attr('title');
                    }
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "followUs",
                            "User": {
                                "socialNetwork" : {
                                    "name" : nombrered,
                                    "origin" : origen,
                                    "location" : location
                                }
                            }
                        }
                    );
                    const event = new CustomEvent('followUs',
                        {
                            "detail": {
                                "User": {
                                    "socialNetwork" : {
                                        "name" : nombrered,
                                        "origin" : origen,
                                        "location" : location
                                    }
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event);
                });
                $("#whatsapp").click(function(){
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "contactUs",
                            "Behavior": {
                                "contactUs" : {
                                    "type" : "Whatsapp",
                                    "location" : "bottom"
                                }
                            }
                        }
                    );
                    const event = new CustomEvent('contactUs',
                        {
                            "detail": {
                                "Behavior": {
                                    "contactUs" : {
                                        "type" : "Whatsapp",
                                        "location" : "bottom"
                                    }
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event);
                });

                $("#llamenos").click(function(){
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "contactUs",
                            "Behavior": {
                                "contactUs" : {
                                    "type" : "Llamenos",
                                    "location" : "bottom"
                                }
                            }
                        }
                    );
                    const event = new CustomEvent('contactUs',
                        {
                            "detail": {
                                "Behavior": {
                                    "contactUs" : {
                                        "type" : "Llamenos",
                                        "location" : "bottom"
                                    }
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event);
                });


                $("h3[data-element='question']").click(function(){
                    var textocompleto = $(this).text();
                    var splittext = textocompleto.split('.');
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "faq",
                            "Behavior": {
                                "faqInfo" : {
                                    "number" : splittext[0].trim(),
                                    "title" : splittext[1].trim()
                                }
                            }
                        }
                    );
                    const event = new CustomEvent('faq',
                        {
                            "detail": {
                                "Behavior": {
                                    "faqInfo" : {
                                        "number" : splittext[0].trim(),
                                        "title" : splittext[1].trim()
                                    }
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event);
                });

                $(".footer-menu a[href='/credife']").click(function(e){
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "creditClick",
                            "Credit": {
                                "credit" : {
                                    "location" : "footer"
                                }
                            }
                        }
                    );
                    const event2 = new CustomEvent('creditClick',
                        {
                            "detail": {
                                "Credit": {
                                    "credit" : {
                                        "location" : "footer"
                                    }
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event2);

                });
                clearTimeout(timeout);
            }
            let bot = $(".review-form-actions button").clone();
            bot.attr("type", 'button');
            $(".review-form-actions button").css({'display':'none'});
            bot.appendTo($(".review-form-actions button").parents(".actions-primary"));
            if (!bot.hasClass('init-adobe')) {
                bot.click(function(e){
                    let f = $("#review-form").serializeArray();
                    let rs = eventResenia(f);
                    const event = new CustomEvent('sendReview',
                        {
                            "detail": {
                                "Behavior": {
                                    "reviews": rs.reviews,
                                    "product": rs.product
                                }
                            }
                        }
                    );
                    $('body')[0].dispatchEvent(event);
                    $(".review-form-actions button[type='submit']").trigger("click");
                });
                bot.addClass('init-adobe');
            }
            }, 3000 );

        });
