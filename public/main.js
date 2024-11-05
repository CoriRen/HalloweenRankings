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

async function updateRating(formElement) {
    const movie = formElement.closest('.movieList').querySelector('.movie').innerText;
    const rating = formElement.querySelector('select[name="updateRating"]').value;

    if (rating === "null") {
        alert("Please select a valid rating.");
        return;
    }

    try {
        const response = await fetch('/updateMovieRating', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mName: movie,
                mRating: rating
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            if (data.movies) {
                updateMoviesListInDOM(data.movies);
            }
        } else {
            console.log('Failed to update rating:', response.status);
        }
    } catch (err) {
        console.log(err);
    }
}

function updateMoviesListInDOM(movies) {
    const movieListContainer = document.querySelector('.movies');
    movieListContainer.innerHTML = ''; 

    movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.classList.add('movieList');
        movieItem.innerHTML = `
            <span class="movie">${movie.movieName}</span>
            <span class="rating">${movie.movieRating}</span>
            <span><form action="/updateMovieRating" method="PUT">
            <select name="updateRating" >
                        <option value="null">Choose Rating</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                    <input type="submit">
                </form></span>
                <span class='fa fa-trash'></span>
        `;
        movieListContainer.appendChild(movieItem);
    });

    attachEventListeners();
}

function attachEventListeners() {
    const deleteText = document.querySelectorAll('.fa-trash');
    const movieForms = document.querySelectorAll('.movieList form');

    Array.from(deleteText).forEach((element) => {
        element.addEventListener('click', deleteMovie);
    });

    Array.from(movieForms).forEach((form) => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            updateRating(this); // Pass the form element to updateRating
        });
    });
}