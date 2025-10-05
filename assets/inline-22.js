    <div class="filtro-top">
        <div class="infos">
            <div id="refine-toggle" class="pull-left">
                <span class="filter">Filtrar por</span></div>
            <div class="pull-right">
                <span class="filter" id="filter">Ordenar por</span>
                <div class="pull" id="algolia-sorts" style="display:none;"></div></div>
            <div class="pull-right" id="algolia-stats"></div></div></div>

    {{#findAutocomplete}}
        <div id="algolia-autocomplete-container"></div>
    {{/findAutocomplete}}

    <div id="algolia_instant_selector"
         class=" with-facets">
        <div class="row">
            <div class="col-md-3" id="algolia-left-container">
                <div id="refine-toggle" class="visible-xs visible-sm"></div>
                <div class="hidden-xs hidden-sm" id="instant-search-facets-container">
                    <div id="clear-refinements"></div>
                    <div id="current-refinements"></div></div></div>

            <div class="col-md-9" id="algolia-right-container">
                <div class="row">
                    <div class="col-md-12">
                        <div>
                            {{#second_bar}}
                               <div id="instant-search-bar"></div>
                            {{/second_bar}}</div></div></div>
                <div class="row">
                    <div class="col-md-12">
                        <div itemscope itemtype="http://schema.org/ItemList" class="hits">
                            <div class="algolia-infos">
                                <div class="pull-left" id="algolia-stats"></div>
                                <div class="pull-right">
                                    <div class="sort-by-label pull-left">
                                        SORT BY &nbsp;</div>
                                    <div class="pull-left" id="algolia-sorts"></div></div>
                                <div class="algolia-clearfix"></div></div>
                            <div id="algolia-banner"></div>
                            <div id="instant-empty-results-container"></div>
                            <div id="instant-search-results-container"></div></div></div>
                    <div class="algolia-clearfix"></div></div>

                <div class="text-center">
                    <div id="instant-search-pagination-container"></div></div></div></div></div>
