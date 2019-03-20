$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log('handle the invalid form');
        formError();
        submitMSG(false, "Asegúrate de ingresar todos los campos de manera apropiada.");
    } else {
        // everything looks good!
        console.log('everything looks good!');
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    console.log('quiero enviar email');
    // Initiate Variables With Form Content
    var data = {
        //service_id: 'default_service',
        //template_id: 'template_tDtxcWkk',
        //user_id: 'user_vUQFJt2jQDNLTKJ1MAqbU',
        template_params: {
            'email': $("#email").val(),
            'msg_subject': $("#msg_subject").val(),
            'name': $("#name").val(),
            'message': $("#message").val()
        }
    };

    console.log(data);
    formSuccess();

    /*
    // Send email by Email JS
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function () {
        formSuccess();
        console.log('form-success');
    }).fail(function (error) {
        console.log('###error!');
        console.log(JSON.stringify(error));
        formError();
        submitMSG(false, JSON.stringify(error));
    });
    // END Send email by Email JS
    */
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-left tada animated text-success";
    } else {
        var msgClasses = "h3 text-left text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}