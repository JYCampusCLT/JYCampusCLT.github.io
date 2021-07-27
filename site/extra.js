window.addEventListener('load',  () => {
    if(window.location.pathname.normalize() === "/contact_us/".normalize()){
        document.getElementsByClassName("md-footer")[0].style.display = "initial";
    }
    else{
        document.getElementsByClassName("md-footer")[0].style.display = "none";
    }
});

function instagram() {
    if( /Android/i.test(navigator.userAgent ) ) {
        // If the user is using an Android device.
        window.location = "instagram://user?username=jesusyouthkozhikode";
    }
    else{
        window.open("https://www.instagram.com/jesusyouthkozhikode","_blank");
    }
}

function youtube() {
    if( /Android/i.test(navigator.userAgent ) ) {
        // If the user is using an Android device.
        window.location = "vnd.youtube://www.youtube.com/channel/UCDf-mNF-iCJ4-8Wm_ZZs8jQ";
    }
    else{
        window.open("https://www.youtube.com/channel/UCDf-mNF-iCJ4-8Wm_ZZs8jQ","_blank");
    }
}

function gmail() {
    if( /Android/i.test(navigator.userAgent ) ) {
        // If the user is using an Android device.
        window.location = "mailto:cct.kozhikode@gmail.com";
    }
    else{
        window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=cct.kozhikode@gmail.com","_blank");
    }
}