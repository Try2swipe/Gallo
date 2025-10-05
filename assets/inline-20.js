require([
        'jquery',
        'Magento_Customer/js/customer-data',
        'mage/url',
        'domReady!'
    ], function ($, customerData, urlBuilder) {
        var today = new Date();
        var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
        var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
        var dateTime = date+''+time;
		let url = 'https://www.elgallomasgallo.com.gt/adobelaunch/adobelaunch/pageloaderforce2?v='+dateTime;
		let sw=true;
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
            data:{
                urlbase: window.location.origin,
                path: window.location.pathname
            }
		})
		.done(function (response) {
		    let bread="";
		    let type="";
		    $(".breadcrumbs li").each(function( index ) {
                if (bread=="") {
                    bread = $( this ).text().trim() ;
                } else {
                    bread = bread + " | " + $( this ).text().trim() ;
                }
            });

		    if (bread=="") {
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
            }

            if ($("body").hasClass("cms-home")) {
                type = "Home";
            }
            if ($("body").hasClass("catalog-category-view")) {
                type = "Categoria";
            }
            if ($("body").hasClass("catalog-product-view")) {
                type = "Producto";
            }
            if (type=="") {
                type = $(document).attr('title');
            }
            response.pageInfo.type = type;
            response.pageInfo.name = response.pageInfo.name + " | " + bread;

            let uri = new URL(window.location.href);
            let tcid = uri.searchParams.get("cid");
            let cid="";
            if(tcid!=null){
                cid = tcid;
            }
            response.pageInfo.trackingCode = cid;
            let pathname = window.location.pathname;
            response.pageInfo.path = pathname;
            response.pageInfo.uri = window.location.href;
            response.pageInfo.referrer = uri.host;

			window.adobeDataLayer = window.adobeDataLayer || [];
			if (isNaN(response.user.username)){
                response.user.username = '';
                response.user.loginState = 'false';
                response.user.registrationDate = '';
                response.user.crmID = '';
            }
            window.adobeDataLayer.push(
                {
                    "event" : "pageLoaded",
                    "Behavior": {
                        "pageInfo": response.pageInfo,
                        "user": response.user
                    }
                }
            );
            const event = new CustomEvent('pageLoaded',
                {
                    "detail": {
                        "Behavior": {
                            "pageInfo": response.pageInfo,
                            "user": response.user
                        }
                    }
                }
            );
            $('body')[0].dispatchEvent(event);
		})
		.fail(function (error) {
		});
        $(document).on('ajaxComplete', function (event, xhr, settings) {
            let storeCode = 'elgallo_gt';
            if($(".pagebuilder-slider.slick-initialized").length){
                if ($(".pagebuilder-slider.slick-initialized .slick-track .slick-slide").length
                && !$(".pagebuilder-slider.slick-initialized .slick-track .slick-slide").hasClass("init_omni_adobe")) {
                    $(".pagebuilder-slider.slick-initialized .slick-track .slick-slide").addClass("init_omni_adobe");
                    $(".pagebuilder-slider.slick-initialized .slick-track .slick-slide a").click(function(){
                        let index = $(this).parents(".init_omni_adobe").attr("data-slick-index");
                        let type = $(this).parent("div").width()+"x"+$(this).parent("div").height();
                        let location="Banner Principal";
                        let destinationURL = $(this).attr("href");

                        window.adobeDataLayer = window.adobeDataLayer || [];
                        window.adobeDataLayer.push(
                            {
                                "event" : "bannerClick",
                                "Behavior": {
                                    "banner" : {
                                        "type" : type,
                                        "number" : index,
                                        "location" : location,
                                        "destinationURL" : destinationURL
                                    }
                                }
                            }
                        );
                        const event = new CustomEvent('bannerClick',
                            {
                                "detail": {
                                    "Behavior": {
                                        "banner" : {
                                            "type" : type,
                                            "number" : index,
                                            "location" : location,
                                            "destinationURL" : destinationURL
                                        }
                                    }
                                }
                            }
                        );
                        $('body')[0].dispatchEvent(event);
                    });
                }
            }
            if ( $("div[data-content-type='banner']").length ) {
                if ($("div[data-content-type='banner']").find("a[data-element='link']").length && !$("div[data-content-type='banner']").find("a[data-element='link']").hasClass("initadobe")) {
                    $("div[data-content-type='banner']").find("a[data-element='link']").addClass("initadobe");
                    $("div[data-content-type='banner']").find("a[data-element='link']").click(function(){
                        let type = $(this).parent("div").width()+"x"+$(this).parent("div").height();
                        let location="Banner Final";
                        if (storeCode=="prado_sv") {
                            location="Banners de Soporte";
                        }
                        let destinationURL = $(this).attr("href");

                        window.adobeDataLayer = window.adobeDataLayer || [];
                        window.adobeDataLayer.push(
                            {
                                "event" : "bannerClick",
                                "Behavior": {
                                    "banner" : {
                                        "type" : type,
                                        "location" : location,
                                        "destinationURL" : destinationURL
                                    }
                                }
                            }
                        );

                        const event = new CustomEvent('bannerClick',
                            {
                                "detail": {
                                    "Behavior": {
                                        "banner" : {
                                            "type" : type,
                                            "location" : location,
                                            "destinationURL" : destinationURL
                                        }
                                    }
                                }
                            }
                        );
                        $('body')[0].dispatchEvent(event);
                    });
                }
            }

            if ($("figure[data-content-type='image']").length) {
                if ($("figure[data-content-type='image']").find("a[data-element='link']").length && !$("figure[data-content-type='image']").find("a[data-element='link']").hasClass("initadobe")) {
                    $("figure[data-content-type='image']").find("a[data-element='link']").addClass("initadobe");
                    $("figure[data-content-type='image']").find("a[data-element='link']").click(function(){
                        let type = $(this).parents("div").width()+"x"+$(this).parents("div").height();
                        let location="Banners de Soporte";
                        let destinationURL = $(this).attr("href");
                        if ($(this).parents(".menu-block").length) {
                            location="Banner Menu Desplegable";
                        }

                        window.adobeDataLayer = window.adobeDataLayer || [];
                        window.adobeDataLayer.push(
                            {
                                "event" : "bannerClick",
                                "Behavior": {
                                    "banner" : {
                                        "type" : type,
                                        "location" : location,
                                        "destinationURL" : destinationURL
                                    }
                                }
                            }
                        );

                        const event = new CustomEvent('bannerClick',
                            {
                                "detail": {
                                    "Behavior": {
                                        "banner" : {
                                            "type" : type,
                                            "location" : location,
                                            "destinationURL" : destinationURL
                                        }
                                    }
                                }
                            }
                        );
                        $('body')[0].dispatchEvent(event);
                    });
                }

            }

            if (settings.url.match(/\/checkout\/cart\/add/i)) {
                url = window.location.origin;
                url = "https://www.elgallomasgallo.com.gt/adobelaunch/adobelaunch/finishaddproduct";
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
                                "event" : "scAdd",
                                "eCommerce": {
                                    "product" : {
                                        "name" : data.nombre,
                                        "sku" : data.sku,
                                        "price" : data.price,
                                        "currency" : data.currency,
                                        "category" : data.category
                                    }
                                }

                            }
                        );
                        const event = new CustomEvent('scAdd',
                            {
                                "detail": {
                                    "eCommerce": {
                                        "product" : {
                                            "name" : data.nombre,
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

                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push(
                            {
                                "event" : "addToCart",
                                "ecommerce": {
                                    "add" : {
                                        "products" : [{
                                            "category" : data.categorySg,
                                            "id" : data.sku,
                                            "name" : data.nombre,
                                            "parent_sku" : data.sku,
                                            "price" : data.price,
                                            "quantity" : data.qty,
                                            "variant" : data.superG
                                        }]
                                    }

                                }
                            }
                        );

                        window.adobeDataLayer = window.adobeDataLayer || [];
                        if (data.open) {
                            window.adobeDataLayer.push(
                                {
                                    "event" : "scOpen",
                                    "eCommerce":""
                                }
                            );
                            const event = new CustomEvent('scOpen',
                                {
                                    "detail":{
                                        "eCommerce" : ""
                                    }
                                }
                            );
                            $('body')[0].dispatchEvent(event);
                        }
                    }
                })
                .fail(function (error) {
                });
            }
        });
    });
