# TypeFinger API Documentation

This document provides information about the API endpoints available in the TypeFinger application.

## Authentication API

### NextAuth Authentication

**Endpoint:** `/api/auth/[...nextauth]`

Handles authentication using NextAuth.js with the following providers:
- Google OAuth
- GitHub OAuth

**Methods:** `GET`, `POST`

**Description:**
This endpoint manages user authentication, session handling, and callbacks. It uses MongoDB as the adapter for storing user information.

**Configuration:**
- Session includes user ID
- Custom sign-in page at `/auth/signin`
- Uses environment variables for provider credentials and secrets

## Test Results API

### Save Test Results

**Endpoint:** `/api/test-results`

**Method:** `POST`

**Description:**
Saves typing test results to the database for the authenticated user.

**Request Body:**
```json
{
  "language": "english",
  "wpm": 85,
  "accuracy": 98.5,
  "duration": 30,
  "errors": 2,
  "testMode": "time",
  "performanceData": [
    {
      "time": 5,
      "wpm": 75,
      "raw": 80
    },
    {
      "time": 10,
      "wpm": 82,
      "raw": 85
    }
  ]
}
```

**Authentication:**
Requires an authenticated user session.

**Response:**
- `200 OK` on successful save
- Error response if save fails

## Environment Variables

The following environment variables are required for the API functionality:

```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url
```

## Data Models

### User
Managed by NextAuth.js and MongoDB adapter

### Test Result
Stores typing test results with the following fields:
- User ID (reference to User)
- Language
- WPM (Words Per Minute)
- Accuracy
- Duration
- Errors
- Test Mode
- Performance Data (time series data of typing performance)
- Timestamp

## Error Handling

API endpoints return appropriate HTTP status codes:
- `200` for successful operations
- `401` for unauthorized access
- `500` for server errors

## Rate Limiting

Currently, there are no rate limits implemented on the API endpoints.

## Future API Endpoints

Planned API endpoints for future development:

1. **User Profile API**
   - Get user profile data
   - Update user preferences

2. **Leaderboard API**
   - Get leaderboard data by time period (daily, weekly, all-time)
   - Get leaderboard data by language
   - Get leaderboard data by time mode

3. **Statistics API**
   - Get detailed user statistics
   - Get user progress over time