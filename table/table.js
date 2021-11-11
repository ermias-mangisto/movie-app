
async function getApi(api){
    try{
        
        return await fetch(api)
        .then(response=>response.json());
    }
    catch(err){
        return err;
    }
}
function getMovies(res,div){

    for(obj of res){
        div.innerHTML +=
        `<tr style="width=100px";>
        <td>${obj.movieName}</td>
        <td><p class="img" >${obj.image}</p></td>
        <td><p>${obj.synopsis}<p></td>
        <td>${obj.linkToMovie}</td>
        <td>${obj.rating}</td>
        <td>${obj._id}</td>
        <td>${obj.date}</td>
        
        </tr>`;
    }
}
window.onload=()=>{
    getApi("https://moviesmern.herokuapp.com/movies/all")
.then(res=>getMovies(res.data,movieTable))
}