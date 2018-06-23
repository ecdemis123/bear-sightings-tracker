# Bear Sighting Tracker API
Have you seen a bear recently? Would you like a way to let the world know? Then you are in the right place, my friend. Welcome to Bear Sighting Tracker API, the world's leading datastore for bear sighting information.

## Up and Running
1. Clone this repository and `cd` into it
2. Set up the database using `docker-compose up`
3. Start the nodejs server using `npm start`
4. Send requests to the API using your favorite tool

## Supported Requests
- GET /sighting/:id
- GET /sighting/search/queryParams
  - supported params: numBears, startDate, endDate, zipCode, species
- POST /sighting
  - request body: numBears, notes, zipCode, species

## Database Schemas
Sightings
+------------+----------+------+-----+---------+----------------+
| Field      | Type     | Null | Key | Default | Extra          |
+------------+----------+------+-----+---------+----------------+
| id         | int(11)  | NO   | PRI | NULL    | auto_increment |
| notes      | text     | NO   |     | NULL    |                |
| numBears   | int(11)  | NO   |     | NULL    |                |
| createdAt  | datetime | NO   |     | NULL    |                |
| updatedAt  | datetime | NO   |     | NULL    |                |
| locationId | int(11)  | YES  | MUL | NULL    |                |
| speciesId  | int(11)  | YES  | MUL | NULL    |                |
+------------+----------+------+-----+---------+----------------+

Locations
+-----------+----------+------+-----+---------+----------------+
| Field     | Type     | Null | Key | Default | Extra          |
+-----------+----------+------+-----+---------+----------------+
| id        | int(11)  | NO   | PRI | NULL    | auto_increment |
| zipCode   | int(11)  | NO   |     | NULL    |                |
| createdAt | datetime | NO   |     | NULL    |                |
| updatedAt | datetime | NO   |     | NULL    |                |
+-----------+----------+------+-----+---------+----------------+

Species
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
