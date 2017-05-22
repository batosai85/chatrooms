import $ from "jquery";
export default function Css_Fix(){
     
    if (navigator.userAgent.search("Firefox") >= 0){ 
        $("head").append(`<link rel="stylesheet" href="/dist/css/mozilla.fix.css"/>`);
    }else if(navigator.userAgent.search("MSIE") >= 0  || navigator.userAgent.search("Trident/") >= 0){
        $("head").append(`<link rel="stylesheet" href="/dist/css/ie.fix.css"/>`);
    }
}