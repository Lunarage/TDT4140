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
equipment_used | [integer] | id of equipment
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
  "id": 1,
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": "Amnesty",
  "user_owner": "Nilsern",
  "description": "Bærplukking",
  "location": "Bymarka",
  "categories": ["Tur", "Bærplukking"],
  "activity_level": 2,
  "equipment_used": ["Bærplukker"],
  "max_participants": 20
  },
  {
  "id": 2,
  "title": "Basketball",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": "Amnesty",
  "user_owner": "Nilsern",
  "description": "Basketball",
  "location": "Munkvollhallen",
  "categories": ["sport"],
  "activity_level": 4,
  "equipment_used": ["Basketball"],
  "max_participants": 10
  }
]
```
GET `/api/activity/?search=basketball`

Example response
```json
[
  {
  "id": 2,
  "title": "Basketball",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": "Amnesty",
  "user_owner": "Nilsern",
  "description": "Basketball",
  "location": "Munkvollhallen",
  "categories": ["sport"],
  "activity_level": 4,
  "equipment_used": ["Basketball"],
  "max_participants": 10
  }
]
```


POST `/api/activity`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | Unique id of activity
title | string | Title of the activity
date | string | YYYY-MM-DDThh:mm:ssZ (ISO 8601)
description | string | description
categories | [integer] | id of categories
equipment_used | [integer] | id of equipment
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
  "id": 1,
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": "Amnesty",
  "user_owner": "Nilsern",
  "description": "Bærplukking",
  "location": "Bymarka",
  "categories": ["Tur", "Bærplukking"],
  "activity_level": 2,
  "equipment_used": ["Bærplukker"],
  "max_participants": 20
  }
]
```

**Response**

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
user_member | [integer] | ids of users

Example response
```json
[
  {
  "id": 1,
  "name": "Amnesty",
  "description": "Bærplukking",
  "image": "link",
  "external_link": "https://amnesty.no/",
  "user_member": [1, 3, 6, 13, 21]
  }
]
```

POST `/api/organization`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | unique id of organization
name | string | name of the organization
description | string | further information
image | string | link to static file
external_link | string | link to organization homepage
user_member | [integer] | ids of users

Example response
```json
[
  {
  "id": 1,
  "name": "Amnesty",
  "description": "Bærplukking",
  "image": "link",
  "external_link": "https://amnesty.no/",
  "user_member": [1, 3, 6, 13, 21]
  }
]
```

**Response**

## User

GET `/api/user`

**Response**

Name | Type | Description
-----|------|------------
id | integer | id of user
first_name | string | users first name
last_name | string | users last name
username | string | users username
email | string | users email

Example response
```json
[
  {
  "id": 1,
  "first_name": "Nils",
  "last_name": "Nilsen",
  "username": "Nilsern",
  "email": "nilsni@std.ntnu.no"
  }
]
```

POST `/api/user`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | id of user
first_name | string | users first name
last_name | string | users last name
username | string | users username
email | string | users email

Example response
```json
[
  {
  "id": 1,
  "first_name": "Nils",
  "last_name": "Nilsen",
  "username": "Nilsern",
  "email": "nilsni@std.ntnu.no"
  }
]
```

**Response**

## Category

GET `/api/category`

**Response**

Name | Type | Description
-----|------|------------
id | integer | unique id of category
title | string | name of category

Example response
```json
[
  {
  "id": 1,
  "title": "Tur"
  }
]
```

POST `/api/category`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | unique id of category
title | string | name of category

Example response
```json
[
  {
  "id": 1,
  "title": "Tur"
  }
]
```

## Equipment

GET `/api/equipment`

**Response**

Name | Type | Description
-----|------|------------
id | integer | unique id of equipment
title | string | name of equipment

Example response
```json
[
  {
  "id": 1,
  "title": "Bærplukker"
  }
]
```

POST `/api/equipment`

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | unique id of equipment
title | string | name of equipment

Example response
```json
[
  {
  "id": 1,
  "title": "Bærplukker"
  }
]
```
