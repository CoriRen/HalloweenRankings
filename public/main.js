const deleteText = document.querySelectorAll('.fa-trash')
const movieForms = document.querySelectorAll('.movieList form');

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})

Array.from(movieForms).forEach((form) => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        updateRating(this); // Pass the form element to updateRating
    });
});

async function deleteMovie(){
    const mName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': mName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function updateRating(formElement){
    const movie = formElement.closest('.movieList').querySelector('.movie').innerText;
    const rating = formElement.querySelector('select[name="updateRating"]').value;
    try{
        const response = await fetch('updateMovieRating', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'mName': movie,
              'mRating': rating
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}