/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");

// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "key4DlL9qmJrcwvJR" }).base(
  "app0J6V1I020Lf7jj"
);

// Get the "songs" table from the base,
// specify the view (which should be SORTED by rating),
// and specify the callback functions that will receive each page of data
base("songs").select({
  // TODO: add your view in here
  //view: "GridView"
}).eachPage(gotPageOfData, gotAllData);

// an empty array to hold our songs data
const songs = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of songs
function gotPageOfData(records, fetchNextPage) {
  console.log("gotPageOfData()");
  console.log("There are "+records.length+" items in records");
  // This takes the list of records and add them to the songs array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
function gotAllData(err) {
  console.log("gotAllData()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call function to show the data
  showData();
}

// show the data on the page
function showData() {
  console.log("showData()");

  // find the shelf element
  const songsContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data.
  // Inside is the code we are applying for EACH song in the list of songs.
  songs.forEach((song) => {

    // Print out what a single songs's data feidls looks like
    console.log("SHOWING THE SONG")
    console.log(song.fields);


    /** CREATE CONTAINER */
    const songContainer = document.createElement("div");
    songContainer.classList.add("songContainer");

    /*******************
    ADD THE TITLE
    *******************/

    const titleElement = document.createElement("h2");
    titleElement.innerText = song.fields.title;
    songContainer.appendChild(titleElement);
    
    /*******************
    ADD ARTIST TITLE
    *******************/

    const artistElement = document.createElement("p");
    artistElement.innerText = song.fields.artist;
    songContainer.appendChild(artistElement);

    /*******************
    ADD SONG RATING
    *******************/

    let ratingElement = document.createElement("p");
    ratingElement.innerText = "Rating: "+ song.fields.rating;
  
    songContainer.appendChild(ratingElement);


    /*******************
    ADD GENRES
    *******************/

    let genresList = song.fields.genres;

    genresList.forEach(function(genre){
      const genreElement = document.createElement("span");
      genreElement.classList.add("genreTag");
      genreElement.innerText = genre;
      songContainer.appendChild(genreElement);

      // TODO: Add this genre name as a class to the songContainer
       songContainer.classList.add(genre); 

    });


    /***********
     TODO: CREATE FILTER-BY-GENRE FUNCTIONALITY
     **********/ 
     let filterKpop = document.querySelector("#kpop");
    filterKpop.addEventListener("click", function(){

        if (songContainer.classList.contains("kpop")){
        songContainer.style.display = "block";
         }else{
        songContainer.style.display = "none"
    }

    });

    let filterPop = document.querySelector("#pop");
    filterPop.addEventListener("click", function(){

    if (songContainer.classList.contains("pop")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }

    });


    let filterIndie = document.querySelector("#indie");
    filterIndie.addEventListener("click", function(){

    if (songContainer.classList.contains("indie")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterRandb = document.querySelector("#randb");
    filterRandb.addEventListener("click", function(){

    if (songContainer.classList.contains("randb")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterJpop = document.querySelector("#jpop");
    filterJpop.addEventListener("click", function(){

    if (songContainer.classList.contains("jpop")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterRap = document.querySelector("#rap");
    filterRap.addEventListener("click", function(){

    if (songContainer.classList.contains("rap")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterHiphop = document.querySelector("#hiphop");
    filterHiphop.addEventListener("click", function(){

    if (songContainer.classList.contains("hiphop")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });
     
    let filterNeosoul = document.querySelector("#neosoul");
    filterNeosoul.addEventListener("click", function(){

    if (songContainer.classList.contains("neosoul")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterCitypop = document.querySelector("#citypop");
    filterCitypop.addEventListener("click", function(){

    if (songContainer.classList.contains("citypop")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

   let filterAll = document.querySelector("#all");
     filterAll.addEventListener("click", function(){
         songContainer.style.display = "block";
     });

    songsContainer.appendChild(songContainer);

  });
}