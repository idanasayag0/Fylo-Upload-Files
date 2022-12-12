let currentSize = 0;
const uploadBTN = document.getElementById('img-input');
const mbText = document.getElementById('totalmb');
const usage = document.getElementById('usageFill');
// Get the modal
const modal = document.getElementById('myModal');
const modalText = document.getElementById('modal-text');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];
// Get the array of the name images when we are upload them.
const addButtonDiv = [];

mbText.innerHTML = currentSize;
document.getElementById('usageRemaining').innerHTML = (
  10 - currentSize
).toFixed(2);
document.getElementById('usageRemaining2').innerHTML = (
  10 - currentSize
).toFixed(2);
usage.style.width = `${(currentSize / 10) * 100}%`;

uploadBTN.addEventListener('change', () => {
  //Upload only images
  const findName = uploadBTN.value;
  const nameValid = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(findName);
  if (!nameValid) {
    modal.style.display = 'flex';
    modalText.innerHTML = 'Please insert a img';
    return;
  }
  let fileSize = uploadBTN.files[0].size / 1000000;
  if (+currentSize + +fileSize > 10) {
    modal.style.display = 'flex';
    modalText.innerHTML = 'There is not enough space on the disk';
    return;
  }
  //Update the elements in the html and build the div of the images name.
  currentSize = (parseFloat(mbText.innerHTML) + fileSize).toFixed(2);
  mbText.innerHTML = currentSize;
  document.getElementById('usageRemaining').innerHTML = (
    10 - currentSize
  ).toFixed(2);
  document.getElementById('usageRemaining2').innerHTML = currentSize;
  usage.style.width = `${(currentSize / 10) * 100}%`;
  const tempName = findName.split('\\');
  buildDiv(tempName.slice(-1)[0], fileSize);
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// Build the div of the images name.
function buildDiv(id, w) {
  const div = {
    name: id,
    weigth: w,
  };
  document.getElementById(
    'addButton'
  ).innerHTML += `<div class='js-div' style='flex:0 0 auto' id=${div.name}>${div.name}<button class='addButton-button' id=${div.name} onclick='removeButton(this.id)' class='addButton-button'><span class='close'>&times;</span> </button></div>`;
  addButtonDiv.push(div);
  if (addButtonDiv.length >= 1) {
    document.getElementById('addButton').style.overflowX = 'scroll';
  }
}
// Remove a image from the div and update the elements in html.
function removeButton(clicked_id) {
  document.getElementById(clicked_id).remove(clicked_id);
  let found = addButtonDiv.find((e) => e.name === clicked_id);
  currentSize = +currentSize - +found.weigth;
  usage.style.width = `${(currentSize / 10) * 100}%`;
  document.getElementById('usageRemaining').innerHTML = (
    10 - currentSize
  ).toFixed(2);
  document.getElementById('usageRemaining2').innerHTML = (
    10 - currentSize
  ).toFixed(2);
  mbText.innerHTML = Math.abs(currentSize.toFixed(3));
  let indexRemove = addButtonDiv.indexOf(found);
  if (indexRemove !== -1) {
    addButtonDiv.splice(indexRemove, 1);
  }
  if (addButtonDiv.length < 1) {
    document.getElementById('addButton').style.overflowX = 'hidden';
    usage.style.width = 0;
    mbText.innerHTML = 0;
  }
}
