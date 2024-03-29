## RecipMe

### Inspiration
For RecipMe, we wanted to take advantage of the fact that grocery prices are rising in today's economy. Recognizing the challenges that individuals and families face in managing their food budgets, we envisioned a platform that could empower users to make the most out of their culinary experiences while being mindful of their financial constraints. The idea was to provide a resource that offers a wide array of user-submitted and AI generated recipes, as well as information on local sales.

### What it does
RecipMe is a user-centered recipe website that stores recipe information submitted by other users, as well as generated by OpenAI. It also gathers information about sales on at local grocery stores. The user can search the site by an ingredient, or they can provide a few ingredients that they have and be given an AI-generated recipe.

### How we built it
- Visual Studio Code
- React, Bootstrap, JavaScript, CSS, HTML for the website
- Google Firebase for database and user authentication

### Challenges we ran into
The major challenges that we ran into were in our backend. We had many features in mind that were not possible to finish in the given time period. One of the challenges we faced was relaying information gathered via web-scraping store flyers to the frontend. Another challenge we faced was formatting OpenAI requests so that they could be added to a Firestore Database, as well as how to implement the use of OpenAI into the front end of our website. Another challenge we faced was image storing. We planned on having images for each recipe stored, but quickly realized that storing images in objects to be retrieved and displayed later was a difficult task.

### Accomplishments that we're proud of
This was the first hackathon for all of our team members. Although we had bigger dreams for our submission, we are satisfied with what we accomplished and plan on continuing the development of RecipMe.

### What we learned
We learned that the combination of popular frameworks and libraries can lead to endless development possibilities.

### What's next for RecipMe
This is just the start of our creation. We plan on enhancing the user experience by improving UI's, implementing bookmarked recipes, and web-scraping store flyers in the user's area to give them sales on ingredients. We also intend to use OpenAI to generate recipes given ingredients that the user provides.