    require(['jquery', 'domReady!'], function ($) {
        /* Valida Formulario */
        var $form = $('#mc-embedded-subscribe-form')
        if ($form.length > 0) {
            $('#mc-embedded-subscribe').bind('click', function (event) {
                if (event) event.preventDefault()
                register($form)
            })
        }
        /* Funcion MAilchimp AJAX */
        function register($form) {
            $('#mc-embedded-subscribe').text('Enviando...');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                cache: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                error: function (err) {
                    alert('Could not connect to the registration server. Please try again later.')
                },
                success: function (data) {
                    $('#mc-embedded-subscribe').text('Enviar')
                    if (data.result === 'success') {
                        // Yeahhhh Success
                        console.log(data.msg)
                        $('#subscribe-result').css({
                            'color': 'rgb(40, 185, 53))',
                            'font-size': '16px',
                            'font-weight': 'bold',
                            'text-align': 'left'
                        })
                        $('#mce-EMAIL').css('borderColor', '#e3e7eb')
                        $('#subscribe-result').html('<p>Gracias por suscribirse.</p>')
                        $('#mce-EMAIL').val('')
                    } else {
                        // Something went wrong, do something to notify the user.
                        console.log(data.msg)
                        var error = data.msg.split(" ", 1);
                        $('#mce-EMAIL').css('borderColor', '#ff8282')
                        $('#subscribe-result').css({
                            'color': 'rgb(240, 11, 11)',
                            'text-align': 'left'
                        })
                        if (error == 0) {
                            $('#subscribe-result').html('<p></strong> Ingrese un valor válido </p>')
                        } else {
                            $('#subscribe-result').html('<p><strong>' + error +
                                "</strong> ya está suscrito a Grupo Monge" + '</p>')
                        }
                    }
                }
            })
        };
    });
