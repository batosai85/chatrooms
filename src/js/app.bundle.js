import $ from "jquery";
import Auth from "./auth/auth.js";
import Api from "./api/api.js";
import Css_Fix from "./css/css.fix.js";
import Toastr_options from "./css/toastr.options.js";

export default function App(){
    $(() => {
        Auth();
        Api();
        Css_Fix();
        Toastr_options();
    });
}