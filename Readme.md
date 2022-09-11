# React is a single page application framework. It is also a virtual DOM

# Async as dealing with mongoose will return a promise. Await is used for the promise basically .then

https://redux.js.org/understanding/thinking-in-redux/glossary

# Redux 
- State 
Single state value that is managed by the store which is often a deeply nested object.

- Action 
A plain object that represents an intention to change the state
Any data needs to eventually be dispatched as actions
Must have a type field that indicates the type of action being perfromed. Types can be defined as constants and imported from another module. 
Best to use strings for type than symbols

- Reducer 
A function that accepts an accumulation and a value and returns a new accumulation. Reducing values down to a single value.
Accumulated value is a state object and the values bing accumulated are actions.
Must be pure functions that return the exact same output for given inputs
Do not put API calls into reducers.

# Redux Pattern 
- Server => Action => Reducer => Components => Actions (Cycle)

# Steps to start:
1. Create a store and create a function to store reducers  
2. create a reducer
3. import into store and add into reducer function. Can check if working in REDUX STORE MANAGER (WEB INSPECT)
4. Create constants 
5. import constants into reducer 
6. Create Action

# Steps to use:
Create constants
Create Reducer
Create Action
Put into components


component level state( javascript object with key value pairs) and global state(application state)

# Redux Thunk ( Middleware )
in action creator make asynchronous request to talk to server

# React Bootstrap 
https://react-bootstrap.github.io/components/spinners/



# Paypal buton
https://www.npmjs.com/package/react-paypal-button-v2

 {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <LoadingMessage />}