

async function Images() {

  var FetchDogs = await fetch("https://dog.ceo/api/breeds/image/random/10")
  var Pics = await FetchDogs.json();

  var Carousel = document.getElementById("carousel")

  Pics.message.forEach(pic => {

    var DogPic = document.createElement("img")
    DogPic.src = pic;
    Carousel.appendChild(DogPic);
  } )

  simpleslider.getSlider({
    container: Carousel,
    transitionTime: 1,
    delay: 2,        
  });
}

function DogInfo(type) {

  var Name = document.getElementById("Name");
  var Description = document.getElementById("Description");
  var MinLife = document.getElementById("MinLife");
  var MaxLife = document.getElementById("MaxLife");
  var DogInfo = document.getElementById("DogInfo")

  Name.innerText = `Name: ${type.attributes.name}`;
  Description.innerText = `Description: 
  ${type.attributes.description}`;
  MinLife.innerText = `Min Life: ${type.attributes.life.min}`;
  MaxLife.innerText = `Max Life: ${type.attributes.life.max}`;
  DogInfo.style.display = "block";

}

async function DogButtons() {

  var Dogs = await fetch("https://dogapi.dog/api/v2/breeds/");
  var Breeds = await Dogs.json();

  var DogButton = document.getElementById("DogButton")

  Breeds.data.forEach((type) => {
    var DB = document.createElement("button");
    DB.textContent = type.attributes.name;
    DB.className = "custom-button";
    DB.onclick = () => DogInfo(type);
    DogButton.appendChild(DB);
});

}

async function FetchDogInfo(typeBreed) {
  var Dogs = await fetch("https://dogapi.dog/api/v2/breeds");
  var Breeds = await Dogs.json();

  var matchedBreed = Breeds.data.find(
    // (breed) => breed.attributes.name.toLowerCase() === breed.toLowerCase()
    (breed) => breed.attributes.name.toLowerCase() === typeBreed.toLowerCase()
  );

  DogInfo(matchedBreed);
};

window.onload = Images();
window.onload = DogButtons();
window.onload = DogInfo();
window.onload = FetchDogInfo();


function AudioNavigation() {

  if (annyang) {
    var speech = {

      'Load dog breed *breed': (breed) => {
          console.log(breed)
          breed = breed.replace(".", "");
          FetchDogInfo(breed);
      },

      'navigate to *page': (page) => {
        page = page.toLowerCase();
        window.location.href = `${page}html`; 
      },

      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color.replace(".", "");
      },

      'hello': () => {
        alert('Hello World');
      },
    };

    annyang.addCommands(speech);
  }
}

function listening() {
AudioNavigation();
annyang.start();
}

function notlistening() {
AudioNavigation ();
annyang.abort();
}
