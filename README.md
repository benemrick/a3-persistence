## shopr - your online wishlist
shopr is a web app pertaining to e-commerce that allows users to collect and manage an online shopping list. This solution serves as an organizatal tool to alleviate the clutter of maintaining web links and product information in basic note taking or text editor software. shopr is a platform dedicated to simplifying the online shopping experience through providing a minimalistic interface that supports basic actions and a central storage location so that information never gets lost.

Users can add shopping items to their wishlist with an associated external link to help track specific locations on the web. By clicking on wishlist items users can navigate to the associated Internet destination. The app also encourages users to select a rating for each item based on desire (where 5 stars represents the most desirable items). The wishlist is then sorted based on ratings and the top 3 most desired items are displayed in a Favorites section. The remainder of the wishlist is stored in a table below the Favorites panel. Here users can update and delete existing records.

https://a3-benemrick.glitch.me

This site is built with an `express.js` server that uses `passport.js` middleware for user authetication. All data consumed by shopr is maintained using `lowdb`, which is a local JSON database that persists between server sessions. The front-end styling of shopr is built using the Bootstrap CDN and its CSS components.

## Express.js Middleware
1. `body-parser` to Parse HTTP request body
2. `passport` for local user authentication 
3. `session` to track user sessions and associate various requests with a specific account
4. `serve-favicon` to display a custom icon in the webpage tab
5. `response-time` to record HTTP response time (in ms) in the header of each request

## Technical Achievements
- **shortid library**: I used the `shortid` (https://github.com/dylang/shortid) javascript library to generate unique, web-friendly ids for each item record in the database. I used the `shortid.generate()` function in `server.js` when creating json records to seed the database with and in the `app.post('/items'` route handler when creating new items to add to the database.

## Design/Evaluation Achievements
- **HTML Accessibility**: I analyzed the accessibility of my site using Chrome's built-in accessibility audit tool available in the developer tools. Using the recommended strategies and manual evaluation suggestions I was able to improve the site's accessibility score from a 54 to a 71. The site now passes 9 automatic audits as opposed to the pervious 3. The outstanding failures are a result of standard Bootstrap class naming conventions.

## Known Issues
The password input text area on the login/register page cannot be selected via standard mouse click. To enter text in the password field select the username field and then navigate using Tab on your keyboard.
