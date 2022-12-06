
let mbLeft=0;
let uploadBTN = document.getElementById("img-input");
let mbText = document.getElementById("totalmb");
let usage = document.getElementById("usageFill");
// Get the modal
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Get the array of the name images when we are upload them.
const addButtonDiv = [];
//Update the elements in the html and update the mbLeft member
mbText.innerHTML = mbLeft;
document.getElementById("usageRemaining").innerHTML = (10-mbLeft).toFixed(2);
document.getElementById("usageRemaining2").innerHTML = (10-mbLeft).toFixed(2);
usage.style.width = `${(mbLeft/10)*100}%`;

uploadBTN.addEventListener("change",()=>{
    //Upload only images
    let findName = uploadBTN.value;
    let nameValid = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(findName);
    if(!nameValid){
        modal.style.display="block";
        modalText.innerHTML = "Please insert a img";
        return;
    }
    let fileSize= uploadBTN.files[0].size / 1000000;
    if(+mbLeft+ +fileSize > 10){
        modal.style.display="block";
        modalText.innerHTML = "There is not enough space on the disk";
        return;
    }
//Update the elements in the html and build the div of the images name. 
    mbLeft = (parseFloat(mbText.innerHTML) + fileSize).toFixed(3);
    mbText.innerHTML = mbLeft;
    document.getElementById("usageRemaining").innerHTML = (10-mbLeft).toFixed(2);
    document.getElementById("usageRemaining2").innerHTML = mbLeft;
    usage.style.width = `${(mbLeft/10)*100}%`;
    const tempName = findName.split("\\");
    buildDiv(tempName.slice(-1)[0],fileSize);
});
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
// Build the div of the images name.
function buildDiv(id,w){
    const div = {
        name:id,
        weigth:w
    }
    document.getElementById("addButton").innerHTML += `<div class='js-div' style='flex:0 0 auto' id=${div.name}>${div.name}<button class='addButton-button' id=${div.name} onclick='removeButton(this.id)' class='addButton-button'><span class='close'>&times;</span> </button></div>`;
    addButtonDiv.push(div);
    if(addButtonDiv.length >= 1){
       document.getElementById("addButton").style.overflowX = "scroll";
    }
}
// Remove a image from the div and update the elements in html.
function removeButton(clicked_id){
    // remove the element
    document.getElementById(clicked_id).remove(clicked_id);
    // find the object in our images array.
    let found = addButtonDiv.find(e => e.name === clicked_id);
    //Updates the elements in the html and update the mbLeft member.
    mbLeft = +mbLeft - +found.weigth;
    usage.style.width = `${(mbLeft/10)*100}%`;
    document.getElementById("usageRemaining").innerHTML = (10-mbLeft).toFixed(2);
    document.getElementById("usageRemaining2").innerHTML = (10-mbLeft).toFixed(2);
    mbText.innerHTML = Math.abs(mbLeft.toFixed(3));
    // find the index of the element in our array.
    let indexRemove = addButtonDiv.indexOf(found);
     if(indexRemove !== -1){
        addButtonDiv.splice(indexRemove,1);
     }
     // If we have less then 1 element so we want to hidden the scrollbar and reset the elements.
     if(addButtonDiv.length < 1){
        document.getElementById("addButton").style.overflowX = "hidden";
        usage.style.width = 0;
        mbText.innerHTML = 0;
     }
}