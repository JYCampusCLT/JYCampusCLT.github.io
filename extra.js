var tasc_state = 1;     //TASC colleges are shown
var mest_state = 1;     //MEST colleges are shown
var core_state = 0;     //Colleges without core team are also shown

window.addEventListener('DOMContentLoaded',  () => {
    if(window.location.pathname.normalize() === "/campuses/".normalize()){  //Campuses page
        // Don't show college descriptions on load
        var desc = document.getElementsByClassName("college_description");
        for(var i=0; i<desc.length; i++){
            desc[i].style.display = "none";
        }

        // Show down button on load
        var arrow = document.getElementById("college_table").getElementsByTagName("img");
        for(var i=0; i<arrow.length; i++){
            arrow[i].className = "arrow_down";
        }
    }
    if(window.screen.width<=1218){  //Nav bar starts opening
        document.getElementsByClassName("md-nav__title")[0].childNodes[2].textContent="JY Kozhikode CCT";
        if(window.screen.width<=500){  //Modify title
            document.getElementsByClassName("md-header__title")[0].getElementsByClassName("md-ellipsis")[0].textContent="JY Kozhikode CCT";
        }
    }
});

// What happens when arrow is pressed
function open_college(college){
    var tr = document.getElementById("college_table").getElementsByTagName("tr");
    var index=1;
    for(var i=0; i<tr.length; i++){
        if(tr[i].id === college.id){
            index = i;
            break;
        }
    }

    image = tr[index-1].getElementsByTagName("td")[0].getElementsByTagName("img")[0];
    if(image.className === "arrow_down"){
        // If arrow is pressed in down state, show description
        image.className = "arrow_up";
        tr[index].style.display = "";
    }
    else{
        // If arrow is pressed in up state, hide description
        image.className = "arrow_down";
        tr[index].style.display = "none";
    }
}

// When tasc button is pressed
function tasc(){
    // Change tasc button text when clicked
    var button = document.getElementById("tasc_button");
    tasc_state = button_coloring(button, tasc_state);

    // Update table
    table_modify();
}

// When mest button is pressed
function mest(){
    // Change mest button text when clicked
    var button = document.getElementById("mest_button");
    mest_state=button_coloring(button, mest_state);

    // Update table
    table_modify();
}

function button_coloring(button, state){
    if(state==0){
        button.style.backgroundColor = "rgb(11, 211, 191)";
        button.style.color = "black";
        return 1;
    }
    else {
        if(document.getElementsByTagName("body")[0].attributes[1].nodeValue==="slate"){
            button.style.backgroundColor = "rgb(46,48,61)";
            button.style.color = "rgb(179, 174, 165)";
        }
        else{
            button.style.backgroundColor = "white";
            button.style.color = "black";
        }
        return 0;
    }
}

// When core button is pressed
function core(){
    if(core_state==0){      //Only Core colleges need to be shown
        core_state=1;
    }
    else{           //All colleges need to be shown
        core_state=0;
    }

    // Update table
    table_modify();
}

// Change table
function table_modify(){
    var state = core_state*100 + tasc_state*10 + mest_state;
    //Change table heading
    var text = document.getElementById("college_table_heading");
    if(state==11){  //011
        text.textContent = "All Campuses";
    }
    else if(state==111){
        text.textContent = "All Campuses with Core team";
    }
    else if(state==1){  //001
        text.textContent = "All MEST Campuses";
    }
    else if(state==101){
        text.textContent = "All MEST Campuses with Core team";
    }
    else if(state==10){
        text.textContent = "All TASC Campuses";
    }
    else if(state==110){
        text.textContent = "All TASC Campuses with Core team";
    }
    else{
        text.textContent = "Search criteria match no campus";
    }
    //Go through all rows
    var tr = document.getElementById("college_table").getElementsByTagName("tr");
    for(var i=0; i<(tr.length)/3; i++){
        index= 3*i;
        if(state==11){
            if(tr[index].classList.contains("hidden_college")){     //If hidden
                show_row(tr[index]);
                show_row(tr[index+1]);
                show_row(tr[index+2]);
            }
        }
        else if(state==111){
            if(tr[index].classList.contains("core_team")){    //core
                if(tr[index].classList.contains("hidden_college")){   //hidden
                    show_row(tr[index]);
                    show_row(tr[index+1]);
                    show_row(tr[index+2]);
                }
            }
            else if(!tr[index].classList.contains("hidden_college")){   //non-core non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
        else if(state==1){
            if(tr[index].classList.contains("mest_stream")){  //mest
                if(tr[index].classList.contains("hidden_college")){   //hidden
                    show_row(tr[index]);
                    show_row(tr[index+1]);
                    show_row(tr[index+2]);
                }
            }
            else if(!tr[index].classList.contains("hidden_college")){   //non-mest non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
        else if(state==101){
            if(tr[index].classList.contains("mest_stream") && tr[index].classList.contains("core_team")){  //core mest
                if(tr[index].classList.contains("hidden_college")){   //hidden
                    show_row(tr[index]);
                    show_row(tr[index+1]);
                    show_row(tr[index+2]);
                }
            }
            else if(!tr[index].classList.contains("hidden_college")){   //non-(core mest) non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
        else if(state==10){
            if(tr[index].classList.contains("tasc_stream")){  //tasc
                if(tr[index].classList.contains("hidden_college")){   //hidden
                    show_row(tr[index]);
                    show_row(tr[index+1]);
                    show_row(tr[index+2]);
                }
            }
            else if(!tr[index].classList.contains("hidden_college")){   //non-tasc non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
        else if(state==110){
            if(tr[index].classList.contains("tasc_stream") && tr[index].classList.contains("core_team")){  //core tasc
                if(tr[index].classList.contains("hidden_college")){   //hidden
                    show_row(tr[index]);
                    show_row(tr[index+1]);
                    show_row(tr[index+2]);
                }
            }
            else if(!tr[index].classList.contains("hidden_college")){   //non-(core tasc) non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
        else{
            if(!tr[index].classList.contains("hidden_college")){   //non-hidden
                hide_row(tr[index]);
                hide_row(tr[index+1]);
                hide_row(tr[index+2]);
            }
        }
    }
}

// Hide a table row
function hide_row(tr){
    tr.classList.add("hidden_college");
    tr.style.display ="none";
    if(tr.classList.contains("college_name")){
        tr.getElementsByTagName("td")[0].getElementsByTagName("img")[0].className = "arrow_down";
    }
}

// Show a table row
function show_row(tr){
    tr.classList.remove("hidden_college");
    if(tr.classList.contains("college_description")){
        /*  Don't show description when unhidden
            If already shown also, don't do anything*/
        return;
    }
    tr.style.display ="";
}

// When sort button is pressed
function sort(){
    // Get all rows
    var tr = document.getElementById("college_table").getElementsByTagName("tr");
    var parent = tr[0].parentNode;
    for(var i=1; i<=(tr.length/6); i++){
        var head= 3*(i-1);  //College name
        parent.insertBefore(tr[head+2],tr[tr.length-head-1]);   //Former space before latter space
        parent.insertBefore(tr[tr.length-head-1],tr[head+2]);   //Latter space after former description
        parent.insertBefore(tr[head+1],tr[tr.length-head-2]);   //Former description before latter description
        parent.insertBefore(tr[tr.length-head-2],tr[head+1]);   //Latter description after former name
        parent.insertBefore(tr[head],tr[tr.length-head-3]);     //Former name before latter name
        parent.insertBefore(tr[tr.length-head-3],tr[head]);     //Latter name at former name position
    }
    // Change sort button text when clicked
    var button = document.getElementById("campus_sort");
    if(button.getAttribute("data-text-swap")==button.innerHTML){
        button.innerHTML = button.getAttribute("data-text-original");
    }
    else {
        button.setAttribute("data-text-original", button.innerHTML);
        button.innerHTML = button.getAttribute("data-text-swap");
    }
}

// When stuff is typed into input box
function college_search(){
    var input = document.getElementById("college_input");
    var tr = document.getElementById("college_table").getElementsByTagName("tr");   // All  rows

    if(input.value.length == 0){    //Not Searching
        for(var i=0; i<tr.length; i++){
            if(tr[i].classList.contains("hidden_college")){
                tr[i].style.display="none";     //Hide this stuff
            }
            else if(tr[i].classList.contains("college_name")){
                tr[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0].className="arrow_down";  //Arrow is down
                tr[i].style.display="";         //Name is shown
            }
            else if(tr[i].classList.contains("college_description")){
                tr[i].style.display="none";     //Description is hidden
            }
            else if(tr[i].classList.contains("college_space")){
                tr[i].style.display="";         //Spacing is shown
            }
        }
        return;
    }
    else{       // Searching
        for(var i=0; i<tr.length; i++){
            if(tr[i].classList.contains("hidden_college")){
                tr[i].style.display="none";     //Hide this stuff
            }
            else if(tr[i].classList.contains("college_name")){
                tr[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0].className="arrow_up";    //Arrow is up
            }
            else if(tr[i].classList.contains("college_description")){
                tr[i].style.display="";         //Description is shown
            }
            else if(tr[i].classList.contains("college_space")){
                tr[i].style.display="";         //Spacing is shown
            }
        }
    }

    var filter = input.value.toUpperCase();

    // Loop through all table rows, and hide those who don't match the search query
    for(var i=0; i<tr.length; i++){
        if(tr[i].classList.contains("hidden_college")){
            continue;       //Don't search
        }
        else if(tr[i].classList.contains("college_name")){
            td = tr[i].getElementsByTagName("td")[1];       //Search 2nd cell
        }
        else if(tr[i].classList.contains("college_description")){
            td = tr[i].getElementsByTagName("td")[0];       //Search 1st cell
        }
        else{
            continue;       //Don't search
        }
    
        // Seacrh in the cell
        if(td){
            var index = td.textContent.toUpperCase().indexOf(filter);
            if(index > -1){    //Substring found
                tr[i].style.display = "";       //Show that row
                /* College descriptions come after college name.
                So, college name might be hidden at first if input doesn't match. We need to unhide it.*/
                if(tr[i].classList.contains("college_description")){
                    tr[i-1].style.display = ""; //Show corresponding name
                    tr[i+1].style.display = ""; //Show spacing
                }
                else{   //College name
                    tr[i+2].style.display = ""; //Show spacing
                }
            }
            else{   //Substring not found
                tr[i].style.display = "none";   //Don't show the row
                //If college description is not shown, make corresponding arrow down
                if(tr[i].classList.contains("college_description")){
                    tr[i-1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].className = "arrow_down";
                    // If college description and college name are not shown, remove spacing
                    if(tr[i-1].style.display==="none"){
                        tr[i+1].style.display = "none"; //Spacing removed
                    }
                }
            }
        }
    }
}

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