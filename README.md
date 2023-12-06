# VenU

This is VenU, a concert application that helps users find local concerts, share information about “Underground”
events, and save shows to a calendar within the app.

## Table of Contents

- [Main Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Libraries Used](#technologies-used)
- [Contributing](#contributing)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Live Link](#live-link)
- [Contact Information](#contact-information)
- [Conclusion](#conclusion)


### Main Features
- **Venues:** View different venues within your location (currently only Denver, CO) and view what artists are playing where and when
- **Concerts:** Explore different concerts at a specific venue and discover more about the artist by viewing live concerts via YouTube and top Spotify tracks
- **Underground:** Discover indie shows from underground artists and post your own small underground shows for users to find
- **Maps:** Look at concert venues on a map to understand where local concert venues are located. Integrated with the Google Maps API with the ability to get directions to any venue from your current location.
- **Profile:** View saved concerts and events, as either "interested" or "going" to a dynamic calendar UI so you never miss a show you want to see. There is also a page that shows basic profile information along with your personal Spotify. 

## Usage
To use the application a user has to create an account through AWS Cognito User Pools, which will send a specific code to the user's email which needs to be input and verified. 
A user will also need to log in to a Spotify account before they can use the application. The app's Spotify API has not yet been approved for production access. This means that 
the user will either have to email me their Spotify account email to be added to a list of test users or use the test-provided test user credentials provided. If a user does not 
have a Spotify account they can use the test credentials as well. 

## Technologies Used
- Vue.js
- Quasar Framework
- GraphQL
- Various AWS products such as AppSync API, Cognito User Pools, Amplify deployment, and more

## Libraries Used
- Axios
- Vuexpersist
- Spotify API
- Google Maps API
- FontAwesome
  

## Contributing
This project is not open for contributions.

## Testing
Testing is not implemented yet but will be using Jest.

## Screenshots
![image](https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/portfolio-screenshots/VenU+Screen+Shot+2023-12-03+at+8.51.39+PM.png)

## Live Link
Visit the live website at [https://master.d984mngke5ikm.amplifyapp.com/](https://master.d984mngke5ikm.amplifyapp.com/).

## Contact Information
Feel free to reach out to me at [patrickcpoole@gmail.com](mailto:patrickcpoole@gmail.com).

## Conclusion
Thank you for checking out VenuE

