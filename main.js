
let slideIndex = 0;

function showSlides() {
  var heroImage = document.getElementsByClassName("heroImage");
  for (let i = 0; i < heroImage.length; i++) {
    heroImage[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > heroImage.length) {slideIndex = 1}    
  
  heroImage[slideIndex-1].style.display = "block";  

  setTimeout(showSlides, 4000); 
}
showSlides();