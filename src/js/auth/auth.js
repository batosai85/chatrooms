import $ from "jquery";
import Auth_forms from "./auth_forms.js";
import Post_user from "./post_user.js";

export default function Auth(){
   /*$(".empty").hide();
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
    });*/
    Auth_forms();

    /*function validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }*/

    Post_user();
   /* function post_user(user) {
        if (user.signusername === "" || user.signemail === "" || user.signpassword === "" || user.confpassword === "") {
            $(".empty").removeClass("error-hide").show();
            return false;
        } else {
            $(".empty").addClass("error-hide").hide(300);
        }
        if (!validateEmail(user.signemail)) {
            $(".email").show();
            return false;
        } else {
            $(".email").hide(300);
        }
        if (user.signpassword !== user.confpassword) {
            $(".edit-match").show();
            return false;
        } else {
            $(".edit-match").hide(300);
        }
        $.ajax({
            method: "POST",
            url: "/user",
            data: JSON.stringify(user),
            contentType: "application/json"
        }).then((data) => {
            if (data !== "error") {
                $(".response").hide(300);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 500);
            } else {
                $(".response").show();
            }
        }).catch((error) => {
            $(".error").hide();
        })
    }

    $(".register").on("click", (e) => {
        e.preventDefault();
        let $user = {};
        $user.signusername = $(".signusername").val();
        $user.signemail = $(".signemail").val();
        $user.signpassword = $(".signpassword").val();
        $user.confpassword = $(".confpassword").val();
        post_user($user);
    });

    $(".btn-login").on("click", () => {
        if ($(".logusername").val() === "" || $(".logpassword").val() === "") {
            $(".empty").removeClass("error-hide").show();
            return false;
        } else {
            $(".empty").addClass("error-hide").hide("slow");
        }
    });*/
    
}