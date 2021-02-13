# API

## Activity

GET `/api/activity`

**Response**

Name | Type | Description
-----|------|------------
title | string | Title of the activity
date | string | YYYY-MM-DDThh:mm:ssZ (ISO 8601)
organization_owner | integer | link to organization
user_owner | integer | link to user

Example response
```json
{
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "user_owner": 1
}
```

POST `/api/activity`

**Parameters**

Name | Type | Description
-----|------|------------
title | string | Title of the activity
date | string | YYYY-MM-DDThh:mm:ssZ (ISO 8601)

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???

## Organization

GET `/api/organization`

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???

POST `/api/organization`

**Parameters**

Name | Type | Description
-----|------|------------
??? | ??? | ???

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???

## User

GET `/api/user`

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???

POST `/api/user`

**Parameters**

Name | Type | Description
-----|------|------------
??? | ??? | ???

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???
