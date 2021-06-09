# requires docker
docker run -p 8000:8000 -d amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath .
