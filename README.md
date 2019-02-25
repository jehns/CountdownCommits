Commit Timestamp Challenge
Usage:
•	Clone Repository to local machine
•	$ npm install
•	$ npm run start
•	Navigate to http://localhost:3000/

Prompt:
Build a webpage with a "countdown clock" that shows the time (in days, hours, minutes, and seconds) until the 2000th commit in a repository is made, which updates live, so you should see it tick down while it is open.

By accessing the given API route, you will get the UNIX timestamps of the commits so far, as a JSON list of integers. Use this information to extrapolate when the two-thousandth commit will be made and set the countdown clock accordingly. Note that the data at this URL has a fixed end time, so you'll never see it update.

Additionally, your page should have a "Commit" button that adds a new commit to the record at the current timestamp (without updating the server). This should affect the predicted end time. (Bonus: can you make the commit button code's runtime not depend on the number of previous commits you have received?)

Solution:
The way I decided to approach this coding challenge was to first fetch the commit timestamp data, then calculate the linear regression using the least squares method. After calculating the linear regression of the data, I used that linear equation to calculate the timestamp at the current commit and the timestamp at the 2000th commit. The difference is the estimated time until 2000th commit.

The commit button creates a UNIX timestamp at the current time, adds the timestamp to the data, and recalculates the linear regression and time remaining. To make the additional commit’s runtime not depend on the number of previous commits, I used closure to cache the results of previous calculations.

Assumptions:
•	Using a linear fit for all commit data is a close enough approximation.
•	All fetched data will be within 0 and 2000 commits and not contain values that are non-integer.


Implementation:
I chose to build the challenge in React because of the ease of state management, fast rendering, and fast development setup with create-react-app. To read more about create-react-app see below.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
