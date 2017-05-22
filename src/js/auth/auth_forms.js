import $ from "jquery";
export default function Auth_forms(){
    $(".empty").hide();
    $(".error").hide();
    $(".response").hide();
    $(".email").hide();
    $(".match").hide();
    $(".usererror").hide();

    $('#login-form-link').click((e) => {
        $(".empty").hide();
        let $this = $(e.currentTarget);
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $this.addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click((e) => {
        $(".empty").hide();
        $(".exist-jade").hide();
        let $this = $(e.currentTarget);
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $this.addClass('active');
        e.preventDefault();
    });
}