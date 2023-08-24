# React + Vite

Description
  You have to create an application that allows users to create a request for the transportation of your parcel or deliver another user's package.
Main pages:
  - /create - select request type (order or deliver)
  - /create/order - create order request
  - /create/deliver - create delivery request
  - /requests - list of all requests
The list of requests must reflect all user-created requests and the provided information. Users can be able to sort all requests by the date of sending, by default sort by the date of creation of requests. The user must be able to edit the request using the dialog window and delete the request.
Request can be of two types: order and deliver. If a user wants to send a parcel, they should create an order type request. In other cases, users can deliver a parcel, and they should create a delivery request

The request creation form must have the following input fields:
  - The city from which the parcel is sent (required)
  - The city to which the parcel is sent (required)
  - Type of parcel: gadgets, drinks, clothes, medicines, other (in case if you create order
  type request)
  - Date of dispatch
  - Parcel description (in case if you create order type request)
Requirements
  1. The application has to be done using any framework (Vue, React) - React
  2. Build your project using builder (Gulp, Webpack, Vite, etc). - Vite
  3. You have to use any CSS preprocessors (SASS, LESS, etc) - SCSS
  4. You have to use any UI framework (Vuetify, Quasar, Element Plus, Material UI, etc.) or
  any CSS framework (Bootstrap, Tailwind, etc.) - MUI
  5. You have to use routing in your work
  6. You have to use state management (Vuex, Pinia, Redux, MobX, etc.) - Redux
  7. Store data should save in LocalStorage and exist after page reload
