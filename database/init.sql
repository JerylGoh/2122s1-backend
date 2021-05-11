-- create the queue table
DROP TABLE IF EXISTS queue_tab; --delete the table everytime you start the db again
CREATE TABLE queue_tab (
    id SERIAL primary key,
    served BOOLEAN not null default false
);

-- create the error table
DROP INDEX IF EXISTS timestamp_key;
DROP TABLE IF EXISTS error_tab; --delete the table everytime you start the db again
CREATE TABLE error_tab (
    id SERIAL primary key,
    timestamp INT not null,
    status_code INT not null,
    payload TEXT not null
);
CREATE INDEX timestamp_key ON error_tab (timestamp);

