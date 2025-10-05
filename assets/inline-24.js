    {{#hasOneResult}}<strong>1</strong> result found{{/hasOneResult}}

    {{#hasManyResults}}
        {{^hasNoResults}}{{first}}-{{last}} out of{{/hasNoResults}}
        <strong>
            <span itemprop="numberOfItems">{{nbHits}}</span>
            resultados encontrados</strong>
    {{/hasManyResults}}

    {{^hasNoResults}}
    in {{seconds}} segundos    {{/hasNoResults}}
