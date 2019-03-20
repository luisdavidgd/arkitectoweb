$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Asegúrate de ingresar todos los campos de manera apropiada.");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    // Initiate Variables With Form Content
    var data = {
        service_id: 'default_service',
        template_id: 'template_n10A6fvX',
        user_id: 'user_MuIOnlpt4NWxGNMG17xD6',
        template_params: {
            'email': $("#email").val(),
            'msg_subject': $("#msg_subject").val(),
            'name': $("#name").val(),
            'message': $("#message").val()
        }
    };

    // Send email by Email JS
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function () {
        formSuccess();
    }).fail(function (error) {
        formError();
        submitMSG(false, JSON.stringify(error));
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Mensaje enviado!")
}

function formError() {
    $("#contactForm").effect("shake");
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "text-left tada animated text-success";
    } else {
        var msgClasses = "text-left text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}