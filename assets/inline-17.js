require([
        'jquery',
        'mage/url',
        'domReady!'
    ], function ($,urlBuilder) {
        if ($(".authorization-link").length) {
            $(".authorization-link a").click(function(e){
                e.preventDefault();
                let href=$(this).attr("href");
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

                window.localStorage.setItem('origen', origen);
                var url = urlBuilder.build("adobelaunch/adobelaunch/initlogin");
                $.ajax({
                    url: url,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        origin: origen
                    },
                })
                .done(function (response) {
                   window.location.href = href;
                })
                .fail(function (error) {
                });
            });
        }
    });
