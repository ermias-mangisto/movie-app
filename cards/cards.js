
async function getApi(api,obj){
    try{
        
        return await fetch(api,obj)
        .then(response=>response.json());
    }
    catch(err){
        return err;
    }
}
function getOnlyMovie(res,div){      
    div.innerHTML +=
    `<img src="${res.image   }"width=40% height=80%>
    <div>
    <h2>${res.movieName}</h2>
    <p>${res.synopsis}</p><br>
    <p><span>link:</span>${res.linkToMovie}</p>
    <p><span>id:</span>${res._id}</p>
    <p><span>date added:</span>${res.date} </p>
    <p><span>rating:</span>${res.rating}/10 </p>
    </div>
    ` 
           
    }
function getMovieEdit(res,div){      
    div.innerHTML +=
    `<form style="display: flex; flex-direction: column; width: 60%; margin-left: auto;margin-right: auto;">
    <label for="movieName">movie name:</label>
    <input type="text" id="movieName" value=${res.movieName}>
    <label for="movieImage">movie image:</label>
    <input type="url" id="movieImage" value=${res.image}>
    <label for="movieSynopsis">movie synopsis:</label>
    <input type="text" id="movieSyno" value="${res.synopsis}">
    <label for="movieLink">movie link:</label>
    <input type="url" id="movieLink" value=${res.linkToMovie}>
    <label for="movieRating">movie rating:</label>
    <input max="10" min="1"id="movieRating" type="number" value=${res.rating}>
    <button type="button"onclick=editMovie("${res._id}")>send</button>
</form>
    ` 
    
}
function printMovieInfo(id){
    
    let boxBackground=document.getElementById("boxBackground");
    let inBox=document.getElementById("inBox");
      boxBackground.style.display="block"
      getApi(`https://moviesmern.herokuapp.com/movies/movie/${id}`)
      .then(res=>getOnlyMovie(res.data,inBox))
  
  
    }
function printEditBox(id){

    let boxBackground=document.getElementById("boxBackground");
    let inBox=document.getElementById("inBox");
      boxBackground.style.display="block"
      getApi(`https://moviesmern.herokuapp.com/movies/movie/${id}`)
      .then(res=>getMovieEdit(res.data,inBox))
  
  
    }
    function deleteMovie(id){
        confirm("are you sure you want to delete ")
    let options={
        method:`DELETE`
    
    }
    getApi(`https://moviesmern.herokuapp.com/movies/movie/${id}`,options)
    .then(res=>console.log(res))
    .then(alert("movie was deleted"))
    if(alert){
        location.reload()
    }
    }

exit.addEventListener("click",()=>{
    boxBackground.style.display="none";
    inBox.innerHTML="";
      
   })
class Movie{
    movieName;
    image;
    synopsis;
   linkToMovie;
    rating;
    constructor(MovieName,MovieIMage,MovieSynopsis,MovieLink,MovieRating){
        this.movieName=MovieName;
        this.image=MovieIMage;
        this.synopsis=MovieSynopsis;
        this.linkToMovie=MovieLink;
        this.rating=MovieRating;

    }
}
function editMovie(id){
    let movie=new Movie(movieName.value,movieImage.value,movieSyno.value,movieLink.value,Number(movieRating.value) )
    let options={
        method:"PUT",
        body:JSON.stringify({movie}),
        headers:{'Content-Type': 'application/json'}
    }
    
    getApi(`https://moviesmern.herokuapp.com/movies/movie/${id}`,options)
    .then(res=>console.log(res))
    .then(alert("movie has been updated"))
    if(alert){
        location.reload()
    }
    
    
}
function getMovies(res,div){
    for(obj of res){
        div.innerHTML +=
        `<div class="movieCards">
        <img src="${obj.image}" width="80%" height="80%">
        <p>${obj.movieName}</p>
        <p>${obj.rating}/10</p>
        <div class="btns">
         <p onclick=printEditBox("${obj._id}")>edit</p>
         <p onclick=deleteMovie("${obj._id}")>delete</p>
         <p onclick=printMovieInfo("${obj._id}")>learn more</p>
         </div>
        </div>`;
    }
}
function getSortedMovies(res,div){
div.innerHTML="";
    for(obj of res){
        div.innerHTML +=
        `<div class="movieCards">
       
        <img src="${obj.image}" width="80%" height="80%">
        <p>${obj.movieName}</p>
        <p>${obj.rating}/10</p>
        <div class="btns">
         <p onclick=printEditBox("${obj._id}")>edit</p>
         <p onclick=deleteMovie("${obj._id}")>delete</p>
         <p onclick=printMovieInfo("${obj._id}")>learn more</p>
         </div>
        </div>`;
    }
}
function getMoviesByName(res,div){
div.innerHTML="";
    for(obj of res){
        div.innerHTML +=
        `<div class="movieCards">
       
        <img src="${obj.image}" width="80%" height="80%">
        <p>${obj.movieName}</p>
        <p>${obj.rating}/10</p>
        <div class="btns">
         <p onclick=printEditBox("${obj._id}")>edit</p>
         <p onclick=deleteMovie("${obj._id}")>delete</p>
         <p onclick=printMovieInfo("${obj._id}")>learn more</p>
         </div>
        </div>`;
    }
}

searchBtn.addEventListener("click",()=>{
getApi(`https://moviesmern.herokuapp.com/movies/movie/searchByName/${searchInput.value}`)
.then(res=>getMoviesByName(res.data,cardHolder))
})


function sortArrayByRating(array,cardHolder){
  let newArray= array.sort((a,b)=>{
       return  b.rating-a.rating

    })
    getSortedMovies(newArray,cardHolder)
}

function sortArrayByDate(array,cardHolder){
  let newArray= array.sort((a,b)=>{
    let dateA = new Date(a.date)
    let dateB =new Date(b.date) 
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
  
    return 0;
  }
  )
    getSortedMovies(newArray,cardHolder)
}
function sortArrayByName(array,cardHolder){
  let newArray= array.sort((a, b)=>{
    var nameA = a.movieName.toUpperCase() 
    var nameB = b.movieName.toUpperCase()  
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  })
    getSortedMovies(newArray,cardHolder)
}

sortBtn.addEventListener("click",()=>{
switch (sortValue.value) {
    case "rating":
        getApi("https://moviesmern.herokuapp.com/movies/all")
.then(res=>sortArrayByRating(res.data,cardHolder))
        break;
    case "movie name" :
        getApi("https://moviesmern.herokuapp.com/movies/all")
.then(res=>sortArrayByName(res.data,cardHolder))
        break;
    case "date":
        getApi("https://moviesmern.herokuapp.com/movies/all")
.then(res=>sortArrayByDate(res.data,cardHolder))
        break;

    default:
        break;
}

})
 window.onload=()=>{
     getApi("https://moviesmern.herokuapp.com/movies/all")
.then(res=>getMovies(res.data,cardHolder))
 }