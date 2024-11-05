# Halloween Movie Rankings
A web application for movie enthusiasts to track, rank, and manage their favorite movies. Users can add new movies to the list, assign or update movie ratings, and delete movies they no longer want to keep track of. The list of movies can also be dynamically sorted by rating.

**Link to project:** [https://halloweenrankings.onrender.com/](https://halloweenrankings.onrender.com/)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB

The front end utilizes HTML and CSS for structure and styling, with JavaScript managing interactivity. A dropdown rating system lets users rate movies, while each movie entry has buttons for updating and deleting.

On the server side, Node.js and Express power the app’s API routes, managing the functionality for adding, updating, deleting, and fetching movies. MongoDB serves as the database, storing movie entries along with their ratings. Each time a movie's rating is updated, the server retrieves and sorts the list by rating before sending it back to the client.

## Optimizations
Sorting Optimization: Instead of reloading the page or manually updating the DOM, the application uses asynchronous JavaScript to re-render the sorted movie list dynamically on each update.
Reduced Redundant API Calls: Implemented API routes that minimize database calls, sending all movies back in a single sorted response after any update, allowing for efficient rendering.
Error Handling Improvements: Added error handling on both the client and server sides to ensure that users receive immediate feedback if an action fails.

## Lessons Learned:
Working on this project deepened my understanding of both front-end interactivity and back-end API integration. I refined my approach to dynamic sorting in the DOM, which improved my ability to manage complex updates without refreshing the page. Handling asynchronous operations, particularly with the fetch API, taught me a lot about managing server responses and handling user actions in real time. This project was also a great opportunity to implement CRUD operations and witness the full stack of an application in action, from the user interface to data storage in MongoDB.

