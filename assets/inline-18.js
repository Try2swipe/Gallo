require([
        'jquery',
        'Magento_Customer/js/customer-data',
        'mage/url',
        'jquery/jquery.cookie',
        'domReady!'
    ], function ($, customerData, urlBuilder) {
        let url = window.location.origin;
        url = url+"/adobelaunch/adobelaunch/afterlogin";
        let url2 = urlBuilder.build('/adobelaunch/adobelaunch/afterlogin');
        let logged = $.cookie('adobe-datalayer-logged');
            $.ajax({
                url: url2,
                type: 'post',
                dataType: 'json',
                data: {
                    action:'login'
                }
            })
            .done(function (response) {
                if (response.login && logged!="true") {
                    let domain = document.domain;
                    $.cookie('adobe-datalayer-logged', 'true',
                        {
                            domain : domain,
                            path: '/'
                        }
                    );
                    window.adobeDataLayer = window.adobeDataLayer || [];
                    window.adobeDataLayer.push(
                        {
                            "event" : "userLogged",
                            "User": {
                                "loginInfo" : {
                                    "origin": response.origin
                                }
                            }
                        }
                    );
                    const event = new CustomEvent('userLogged',
                        {
                            "detail": {
                                "User": {
                                    "loginInfo" : {
                                        "origin": response.origin
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

    });
