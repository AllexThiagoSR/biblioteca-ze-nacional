#!/bin/bash

DB_CONTAINER="banco_sql"
DB_USER="root"
DB_PASSWORD="root"
SQL_FILE="./dumps/biblioteca_nacional.sql"
echo "$DB_PASSWORD"

docker exec -i "$DB_CONTAINER" mysql -u "$DB_USER" -p"$DB_PASSWORD" < "$SQL_FILE"

if [ $? -eq 0 ]; then
  echo "Database restored!"
else
  echo "Error restoring database!"
fi