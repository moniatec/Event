- users

  - GET /users/:userId => get a single user info (returns userName and email)
  - POST /users => create a new user (returns userId and token)
  - POST /users/token => verifies user login and returns token for the user
  - GET /users/:userId/events => get the list of events for a user.

- events

  - GET /events => get a list of events
  - POST /events => create a new event
  - GET /events/:eventId => get a full description for a single event
  - Put /events/eventId => update details for an event by th host only.
  - GET /events/eventId/members => get all members for and event within eventId
