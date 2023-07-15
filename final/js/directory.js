// Change the grid style when button is pressed
const gridbutton = document.querySelector('.gridbutton');
const directorygrid = document.querySelector('.directory-grid');
const businessbox = document.querySelectorAll('.business-box');
const businesstext = document.querySelectorAll('.businesstext');
// const businessimg = document.querySelector('.businessimg');
gridbutton.addEventListener('click', ()=>{
    directorygrid.classList.toggle("directory-grid-alt");
    businessbox.forEach(div => {
        div.classList.toggle('business-box-alt');
      })
    //businessbox.classList.toggle("business-box-alt");
    businesstext.forEach(div => {
        div.classList.toggle('businesstext-alt');
      })
    //businesstext.classList.toggle("businesstext-alt");
}, false);

// Directory page
fetch("../../final/businesses.json")
.then(function (response) {
    if(response.ok) {
    return response.json();
    }
throw new ERROR('Network response was not ok');
})
.then(function (jsonObject) {
    console.log(jsonObject);
    for (let i = 0; i < 10; i++) {
        const bus = jsonObject["businesses"];
        let name = bus[i].name;
        let phone = bus[i].contact;
        let businessimg = bus[i].imageurl;
        let website = bus[i].website;

        // Change the text content
        document.getElementById('businessimg' + i).src = businessimg;
        document.getElementById('businessimg' + i).alt = name;
        document.getElementById('businessname' + i).textContent = name;
        document.getElementById('businesscontact' + i).innerHTML = phone;
        document.getElementById('businesswebsite' + i).href = website;
        console.log(website);
        console.log("success");
    }
    
})
.catch(function(error){
console.log('Fetch error: ', error.message);
})