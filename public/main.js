const deleteText = document.querySelectorAll('.fa-trash')
const ratingMenu = document.querySelectorAll('.ratingsMenu')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})

Array.from(ratingMenu).forEach((element)=>{
    element.addEventListener('click', updateRating)
})
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

async function updateRating(){
    const mName = this.parentNode.childNodes[1].innerText
    const mRating = this.parentNode.childNodes[2].innerText
    try{
        const response = await fetch('updateMovieRating', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieName': mName,
              'movieRating': mRating
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}