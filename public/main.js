document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
});

async function fetchRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return response.ok ? response.json() : console.error('Request failed:', response.status);
    } catch (error) {
        console.error(error);
    }
}

function attachEventListeners() {
    document.querySelectorAll('.fa-trash').forEach(element =>
        element.addEventListener('click', deleteMovie)
    );

    document.querySelectorAll('.movieList form').forEach(form =>
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            updateRating(this);
        })
    );
}

async function deleteMovie() {
    const mName = this.closest('.movieList').querySelector('.movie').innerText;
    const data = await fetchRequest('/deleteMovie', 'DELETE', { movieName: mName });
    if (data) location.reload();
}

async function updateRating(formElement) {
    const movie = formElement.closest('.movieList').querySelector('.movie').innerText;
    const rating = formElement.querySelector('select[name="updateRating"]').value;

    if (rating === 'null') {
        alert('Please select a valid rating.');
        return;
    }

    const data = await fetchRequest('/updateMovieRating', 'PUT', { mName: movie, mRating: rating });
    if (data?.movies) updateMoviesListInDOM(data.movies);
}

function updateMoviesListInDOM(movies) {
    const movieListContainer = document.querySelector('.movies');
    movieListContainer.innerHTML = movies.map(movie => `
        <li class="movieList">
            <span class="movie">${movie.movieName}</span>
            <span class="rating">${movie.movieRating}</span>
            <span>
                <form action="/updateMovieRating" method="PUT">
                    <select name="updateRating">
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
                    <input type="submit" value="Update">
                </form>
            </span>
            <span class='fa fa-trash'></span>
        </li>
    `).join('');
    attachEventListeners();
}
