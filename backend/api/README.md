# API

## Activity

GET `/api/activity`

**Response**

Name | Type | Description
-----|------|------------
id | integer | Unique id of activity
title | string | Title of the activity
date | string | YYYY-MM-DDThh:mm:ssZ (ISO 8601)
description | string | description
categories | [integer] | id of categories
equipment | [integer] | id of equipment
image | string | link to static file
location | string | description of location
max_participants | integer | maximum number of participants
activity_level | integer | 1-5
organization_owner | integer | link to organization
user_owner | integer | link to user

Example response
```json
[
  {
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "user_owner": 1
  }
]
```

POST `/api/activity`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | unique id of activity
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
id | integer | unique id of organization
name | string | name of the organization
description | string | further information
image | string | link to static file
external_link | string | link to organization homepage
members | [integer] | ids of users

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
id | integer | id of user
first_name | string | 
last_name | string | 
username | string | 
email | string | 

POST `/api/user`

**Parameters**

Name | Type | Description
-----|------|------------
??? | ??? | ???

**Response**

Name | Type | Description
-----|------|------------
??? | ??? | ???

## Category

GET `/api/category`

**Response**

Name | Type | Description
-----|------|------------
id | integer | unique id of category
title | string | yes

## Equipment

GET `/api/equipment`

**Response**

Name | Type | Description
-----|------|------------
id | integer | unique id of equipment
title | string | yes
