# Next.js OpenPlanFlow App
To run the app locally, you need the database. You can use this command
````
docker-compoup -d
````
* -d means __detached__ |despegada a la consola|

*MongoDB URL local 
````
mongodb://localhost:27017/entriesdb
````

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

##Llenar la base de datos con información de pruebas

Lamar a:
````
http://localhost:3000/api/seed
````