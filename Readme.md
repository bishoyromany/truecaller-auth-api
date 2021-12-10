### Installation Requirements

1. nodejs
2. yarn (nodejs package manager)

### Installation Steps

1. Clone the repository
2. Run `yarn install`
3. Run `yarn start`

### API Routes

1. /api/truecaller/auth?token=API_KEY -> Authenticate the user for truecaller callback.
2. /api/truecaller/user/:requestId -> Get the user information using request id.

### Notes

**API KEY** Is Required For _/api/truecaller/auth_ Route, To Allow Truecaller On To Use The API.
