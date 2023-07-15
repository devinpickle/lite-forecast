const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
  .then(function (response) {
     if(response.ok) {
         return response.json();
     }
    throw new ERROR('Network response was not ok');
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const prophets = jsonObject["prophets"];
    for (let i = 0; i < prophets.length; i++ ) {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let bd = document.createElement('p');
        let bp = document.createElement('p');
        let img = document.createElement('img');

        bd.textContent = prophets[i].birthdate;
        bp.textContent = prophets[i].birthplace;
        img.src = prophets[i].imageurl;
        img.alt = prophets[i].name + ' ' + prophets[i].lastname;
        h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;

        card.appendChild(h2);
        card.appendChild(bd);
        card.appendChild(bp);
        card.appendChild(img);

        document.querySelector('div.cards').appendChild(card);
    }
  })
.catch(function(error){
   console.log('Fetch error: ', error.message);
})


const requestURL = '';
fetch(requestURL)
.then(function (response) {
if(response.ok) {
return response.json();
}
throw new ERROR('Network response was not ok');
})
.then(function (jsonObject) {
console.log(jsonObject);  // temporary checking for valid response and data parsing
})
.catch(function(error){
console.log('Fetch error: ', error.message);
})
