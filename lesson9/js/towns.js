
// Add town data
fetch('../../lesson9/towndata.json')
  .then(function (response) {
     if(response.ok) {
         return response.json();
     }
    throw new ERROR('Network response was not ok');
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const towns = jsonObject["towns"];
    
        // Get Preston data
        let prestonMotto = document.getElementById('pres-motto');
        let prestonYear = document.getElementById('pres-year');
        let prestonPop = document.getElementById('pres-pop');
        let prestonFall = document.getElementById('pres-fall');
        let prestonImg = document.getElementById('pres-img');
        prestonMotto.textContent = towns[4].motto;
        prestonYear.textContent += towns[4].yearFounded;
        prestonPop.textContent += towns[4].currentPopulation;
        prestonFall.textContent += towns[4].averageRainfall;
        prestonImg.src = "images/" + towns[4].photo;
        prestonImg.alt = towns[4].name;
        console.log("Preston data is done");

        // Get Fish Haven data
        let fishMotto = document.getElementById('fish-motto');
        let fishYear = document.getElementById('fish-year');
        let fishPop = document.getElementById('fish-pop');
        let fishFall = document.getElementById('fish-fall');
        let fishImg = document.getElementById('fish-img');
        fishMotto.textContent = towns[1].motto;
        fishYear.textContent += towns[1].yearFounded;
        fishPop.textContent += towns[1].currentPopulation;
        fishFall.textContent += towns[1].averageRainfall;
        fishImg.src = "images/" + towns[1].photo;
        fishImg.alt = towns[1].name;

        // Get Soda Springs data
        let sodaMotto = document.getElementById('soda-motto');
        let sodaYear = document.getElementById('soda-year');
        let sodaPop = document.getElementById('soda-pop');
        let sodaFall = document.getElementById('soda-fall');
        let sodaImg = document.getElementById('soda-img');
        sodaMotto.textContent = towns[5].motto;
        sodaYear.textContent += towns[5].yearFounded;
        sodaPop.textContent += towns[5].currentPopulation;
        sodaFall.textContent += towns[5].averageRainfall;
        sodaImg.src = "images/" + towns[5].photo;
        sodaImg.alt = towns[5].name;
    
  })
.catch(function(error){
   console.log('Fetch error: ', error.message);
})

