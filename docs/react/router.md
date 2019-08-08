# Router

## `history`

```jsx harmony
import createHistory from "history/createBrowserHistory"

const history = createHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

// Use push, replace, and go to navigate around.
history.push("/home", { some: "state" })

// To stop listening, call the function returned from listen().
unlisten()
```
