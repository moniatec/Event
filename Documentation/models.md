## **users**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userName       |  string   |              not null |
| email          |  string   |      not null, unique |
| hashedPassword |  string   |     not null (binary) |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **events**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| eventName      |  string   |              not null |
| time           | timestamp |              not null |
| description    |   text    |              not null |
| photoUrl       |   text    |              not null |
| location       |  string   |              not null |
| hostId         |  integer  |           foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **members**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  |           foreign key |
| eventId        |  integer  |           foreign key |
| checkedIn      |  boolean  |              not null |