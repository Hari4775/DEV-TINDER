## DEV TINDER API COLLECTIONS

## AuthRouter
-POST /signup
-POST /login
-POST /logout

## PROFILE ROUTER
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## CONNECTION REQUEST ROUTER
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## USER ROUTER
GET /connections
GET /requests/recieved
GET /feed - Gets you the profiles of other on platforms

Status : ignore, interested, accepted, rejected