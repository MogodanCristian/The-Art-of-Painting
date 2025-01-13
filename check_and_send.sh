#!/bin/bash

until curl -s http://localhost:27017; do
	echo "Waiting for MongoDB availability..."
	sleep 2
done

until curl -X GET -s http://localhost:8080/api/paintings/get-all-paintings; do
	echo "Waiting for server availability..."
	sleep 2
done

curl -X POST --header "Content-Type: application/json" --data '{"username": "viewer", "role":"viewer", "password": "Password123"}' --location 'localhost:8080/api/auth/register'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg","artist": "Leonardo da Vinci","year": "1503","value": "850000000"}'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg","artist": "Sandro Boticelli","year": "1484","value": "40000000000"}'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg0Pzbr3GWoWr_PHcEcaquPLvRP_kRlWTwlg&s","artist": "Johannes Vermeer","year": "1665","value": "35000000000"}'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://cdn.britannica.com/10/182610-050-77811599/The-Persistence-of-Memory-canvas-collection-Salvador-1931.jpg","artist": "Salvador Dali","year": "1931", "value": "90000000000"}'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://cdn.britannica.com/34/114834-050-F5310205/Liberty-Leading-the-People-oil-canvas-Eugene-1830.jpg","artist": "Eugene Delacroix","year": "1830","value": "4500000000000"}'

curl --location 'localhost:8080/api/paintings/create-painting' --header 'Content-Type: application/json' --data '{"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OGzwIYQZM-gfZrxl0Nrbv8up7cUG6TaSxw&s","artist": "Edvard Munch","year": "1893","value": "8746452343240"}'

echo "POST Requests sent."
