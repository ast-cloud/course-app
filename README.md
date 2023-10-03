An online learning platform created in Next.js. The project contains 2 main next.js apps for user side and admin side.
Users can purchase and view courses. Admin can add new courses to the platform and edit the existing courses.

A monorepo (Turborepo) is used to host both the apps in a single repository.

React state management library used - Recoil

Typescript is used as the primary language.

User side app - Cookie based authentication is implemented using next-auth library.

Admin side app - Localstorage is used for storing JWT session tokens for authentication.

UI library - React MUI 

Fully responsive using Flexbox and MediaQueries.

Database - MongoDB

Axios library is used as an HTTP client to make REST API calls.


Deployed at Vercel -

Admin app - https://course-app-three.vercel.app
User side - https://course-app-users.vercel.app