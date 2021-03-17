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
categories_names | [string] | strings of categories
equipment_used | [integer] | id of equipments
equipment_used_names | [string] | string of equipments
image | string | link to static file
location | string | description of location
max_participants | integer | maximum number of participants
activity_level | integer | 1-5
organization_owner | integer | organization id
organization_owner_name | string | organization name
user_owner | integer | user id
user_owner_username | string | users username

Example response
```json
[
  {
  "id": 1,
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 2,
  "user_owner_username": "Nilsern",
  "description": "Bærplukking",
  "location": "Bymarka",
  "categories": [2, 3],
  "categories_names": ["Tur", "Bærplukking"],
  "activity_level": 2,
  "equipment_used": [1],
  "equipment_used_names": ["Bærplukker"],
  "max_participants": 20
  },
  {
  "id": 2,
  "title": "Basketball",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 2,
  "user_owner_username": "Nilsern",
  "description": "Basketball",
  "location": "Munkvollhallen",
  "categories": [1],
  "categories_names": ["Sport"],
  "activity_level": 4,
  "equipment_used": [1],
  "equipment_used_names": ["Basketball"],
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
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 2,
  "user_owner_username": "Nilsern",
  "description": "Basketball",
  "location": "Munkvollhallen",
  "categories": [1],
  "categories_names": ["Sport"],
  "activity_level": 4,
  "equipment_used": [1],
  "equipment_used_names": ["Basketball"],
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
categories_names | [string] | strings of categories
equipment_used | [integer] | id of equipments
equipment_used_names | [string] | string of equipments
image | string | link to static file
location | string | description of location
max_participants | integer | maximum number of participants
activity_level | integer | 1-5
organization_owner | integer | organization id
organization_owner_name | string | organization name
user_owner | integer | user id
user_owner_username | string | users username

Example response
```json
[
  {
  "id": 1,
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 2,
  "user_owner_username": "Nilsern",
  "description": "Bærplukking",
  "location": "Bymarka",
  "categories": [2, 3],
  "categories_names": ["Tur", "Bærplukking"],
  "activity_level": 2,
  "equipment_used": [1],
  "equipment_used_names": ["Bærplukker"],
  "max_participants": 20
  }
]
```

PUT `/api/activity/{id}/signup`
DELETE `/api/activity/{id}/signup`

Signs up/withdraws the logged in user for/from the given activity.

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | Unique id of activity

Returns status code 204 on success with no content.

Returns status code 400 on failure
either due to the activity not being organized
or the activity is full.

PUT `/api/activity/{id}/star`
DELETE `/api/activity/{id}/star`

Stars an activity for the logged in user.

**Parameters**

Name | Type | Description
-----|------|------------
id | integer | Unique id of activity

Returns status code 204 on success with no content.

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
  "user_member": ["User1", "User2"]
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
password | string | users password
email | string | users email

Example response
```json
[
  {
  "id": 1,
  "first_name": "Nils",
  "last_name": "Nilsen",
  "username": "Nilsern",
  "password": "kryptert",
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
password | string | users password
email | string | users email

Example response
```json
[
  {
  "id": 1,
  "first_name": "Nils",
  "last_name": "Nilsen",
  "username": "Nilsern",
  "password": "kryptert",
  "email": "nilsni@std.ntnu.no"
  }
]
```

GET `/api/user/3/activity`

**Response**

Name | Type | Description
-----|------|------------
id | integer | Unique id of activity
title | string | Title of the activity
date | string | YYYY-MM-DDThh:mm:ssZ (ISO 8601)
description | string | description
categories | [integer] | id of categories
categories_names | [string] | strings of categories
equipment_used | [integer] | id of equipments
equipment_used_names | [string] | string of equipments
image | string | link to static file
location | string | description of location
max_participants | integer | maximum number of participants
activity_level | integer | 1-5
organization_owner | integer | organization id
organization_owner_name | string | organization name
user_owner | integer | user id
user_owner_username | string | users username

Example response
```json
[
  {
  "id": 1,
  "title": "Tur i skogen",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 3,
  "user_owner_username": "Nilsern",
  "description": "Bærplukking",
  "location": "Bymarka",
  "categories": [2, 3],
  "categories_names": ["Tur", "Bærplukking"],
  "activity_level": 2,
  "equipment_used": [1],
  "equipment_used_names": ["Bærplukker"],
  "max_participants": 20
  },
  {
  "id": 2,
  "title": "Basketball",
  "date": "2021-02-28T14:30:00Z",
  "organization_owner": 1,
  "organization_owner_name": "Amnesty",
  "user_owner": 3,
  "user_owner_username": "Nilsern",
  "description": "Basketball",
  "location": "Munkvollhallen",
  "categories": [1],
  "categories_names": ["Sport"],
  "activity_level": 4,
  "equipment_used": [1],
  "equipment_used_names": ["Basketball"],
  "max_participants": 10
  }
]
```

GET `/api/user/3/organization`

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
  "user_member": ["User1", "User3"]
  }
  {
  "id": 2,
  "name": "Rosenborg",
  "description": "Fotballklubb",
  "image": "link",
  "external_link": "https://rbk.no/",
  "user_member": ["User3"]
  }
]
```

## CurrentUser

GET `/api/current_user`

**Response**

Name | Type | Description
-----|------|------------
id | integer | id of user
first_name | string | users first name
last_name | string | users last name
username | string | users username
password | string | users password
email | string | users email

Example response
```json
[
  {
  "id": 1,
  "first_name": "Nils",
  "last_name": "Nilsen",
  "username": "Nilsern",
  "password": "kryptert",
  "email": "nilsni@std.ntnu.no"
  }
]
```

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
