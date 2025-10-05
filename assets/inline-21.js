window.screenM = '769';
    window.widthThreshold = '768';
    window.designSettingsEnabled = '';
    window.menuFocusOverlay = '';

    require(['jquery', 'navigationJs' ],
        function   ($, navigationJs) {
            $(document).ready(function() {
                navigationJs.init();
                $(window).on('resize', function() {
                    navigationJs.init();
                });

                let navigation = $(".navigation");
                let addmenurole = navigation.find("li");
                for (let i = 0; i < addmenurole.length; i++) {
                    $(addmenurole[i]).attr("role","none");
                }
                jQuery('.section-items.nav-sections-items').attr('role','none');
            });
        });
