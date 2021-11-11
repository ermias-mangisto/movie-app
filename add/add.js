async function getApi(api,obj){
    try{
        
        return await fetch(api,obj)
        .then(response=>response.json());
    }
    catch(err){
        return err;
    }
}

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

addMovie.addEventListener("click",()=>{
    let movie=new Movie(movieName.value,movieImage.value,movieSyno.value,movieLink.value,Number(movieRating.value) )
let options={
    method:"POST",
    body:JSON.stringify({movie}),
    headers:{'Content-Type': 'application/json'}
}

getApi("https://moviesmern.herokuapp.com/movies/saveMovie",options)
.then(res=>console.log(res))
.then(alert("movie has been uploaded"))
    if(alert){
        location.reload()
    }
}

)