

var Quote = document.getElementById("RandomQuote");

function GenerateQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then((res) => res.json())
    .then((quotes) => {
      Quote.textContent = `"${quotes[0].q}" - ${quotes[0].a}`;
    });
}
  
GenerateQuote();

function AudioNavigation() {

  console.log("function is running")

    if (annyang) {

      var speech = {

        "navigate to *page": (page) => {
          page = page.toLowerCase();
          window.location.href = `${page}html`; 
        },

        "change the color to *color": changePageColor,
        

        "hello": () => { alert("Hello world!"); }
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
  
// function loadCommands() {
//   if (annyang) {
//       // Let's define a command.
//       const commands = {
//           'hello': () => { alert('Hello world!'); },
//           'change the color to *color': changePageColor,
//       };

//       // Add our commands to annyang
//       annyang.addCommands(commands);

//       // Start listening.
//       annyang.start();
//   }

// }

var changePageColor = function (color) {
  console.log(typeof color);
  document.body.style.backgroundColor = color.replace(".", "");
}

