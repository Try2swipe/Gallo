    <div class="col-md-4 col-sm-6" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <meta itemprop="position" content="{{__position}}" />
        <div class="result-wrapper" itemprop="item" itemscope itemtype="http://schema.org/Product">
            <meta itemprop="url"
                {{^__queryID}} content="{{url}}" {{/__queryID}}
                {{#__queryID}} content="{{urlForInsights}}" {{/__queryID}}
                />
            <a class="result"
                {{^__queryID}} href="{{url}}" {{/__queryID}}
                {{#__queryID}} href="{{urlForInsights}}" {{/__queryID}}
                data-objectid="{{objectID}}"
                data-indexname="{{__indexName}}"
                data-position="{{__position}}"
                data-queryid="{{__queryID}}">
                <div class="result-content">
                    <div class="result-thumbnail">
                        {{#image_url}}<img itemprop="image" src="{{{image_url}}}" alt="{{{name}}}" />{{/image_url}}
                        {{^image_url}}<span class="no-image"></span>{{/image_url}}</div>
                    <div class="result-sub-content">
                        <h3 itemprop="name" class="result-title text-ellipsis">
                            {{{ _highlightResult.name.value }}}</h3>
                        <div class="ratings">
                            <div class="result-sub-content">
                                <div class="product-reviews-summary short">
                                    <div class="rating-summary">
                                        <span class="label"><span>Valoración:</span></span>
                                        <div class="rating-result" title="{{rating_summary}}%">
                                            <span style="width:{{rating_summary}}%">
                                                <span>{{rating_summary}}%</span></span></div></div></div>

                                <div itemprop="offers" itemscope itemtype="http://schema.org/AggregateOffer" class="price">
                                    <div class="price-wrapper">
                                        <div>
                                            <span itemprop="lowPrice" class="after_special
                                                    {{#price.GTQ.default_original_formated}}
                                                        promotion
                                                    {{/price.GTQ.default_original_formated}}">
                                                {{price.GTQ.default_formated}}</span>
                                            {{#price.GTQ.default_original_formated}}
                                                <span itemprop="highPrice" class="before_special">
                                                    {{price.GTQ.default_original_formated}}</span>
                                                {{/price.GTQ.default_original_formated}}
                                                {{#price.GTQ.default_tier_formated}}
                                                <span class="tier_price">
                                                    As low as                                                    <span class="tier_value">{{price.GTQ.default_tier_formated}}</span></span>
                                            {{/price.GTQ.default_tier_formated}}</div></div></div></div></div>
                        <div class="result-description text-ellipsis">{{{ _highlightResult.description.value }}}</div>

                        <div class="button-by-content">
                            <span class="button-buy">Comprar</span></div>

                        {{#isAddToCartEnabled}}
                        <form data-role="tocart-form" action="{{ addToCart.action }}" method="post">
                            <input type="hidden" name="product" value="{{objectID}}">
                            <input type="hidden" name="uenc" value="{{ addToCart.uenc }}">
                            <input name="form_key" type="hidden" value="{{ addToCart.formKey }}">
                            <button type="submit" title="Añadir al carrito" class="action tocart primary"
                            data-objectid="{{objectID}}"
                            data-indexname="{{__indexName}}"
                            data-position="{{__position}}"
                            data-queryid="{{__queryID}}"
                            >
                                <span>Añadir al carrito</span></button></form>
                        {{/isAddToCartEnabled}}</div></div>
                <div class="algolia-clearfix"></div></a></div></div>
