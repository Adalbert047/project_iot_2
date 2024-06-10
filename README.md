# Dashboard de Visualizacion

# Integrantes
* Adalberto Amaya García
* Gabriela Estrello Guadarrama
* Victor Eduardo García Sardaneta
* Ángel Gabriel Herrera Contreras


# Descripción
El proyecto consiste de una pagina web, el cual esta hecha con Angular 17, Bootstrap 5, HTML, CSS y TypeScript, la pagina visualiza datos capturados desde una placa ESP32, mediante un script, el cual provee una conexion a un provedor MQTT, el cual guarda los datos,
posteriormente los datos son capturados mediante la API de Ubidots, para mayor informacion del script de Arduino para la ESP32, que sensores se usaron, consulte el repositorio siguiente:

https://github.com/GabrielaEG/IoT

# Implementación
Para la elaboracion del proyecto, tomar en cuenta las siguientes caracteristicas:
  * Conocimiento basico de Angular, Bootstrap 5, HTML, CSS y TypeScript.
  * Conocimiendo de MVC
  * Uso de HTTP
  * Conocimiento de la libreria Chart.js
  * Conocimiento de la libreria ngx-pagination

Para mayor informacion de las librerias o documentacion de lenguajes usados, consulte a las siguientes URLS:

* Libreria de ngx-pagination: https://www.npmjs.com/package/ngx-pagination
* Libreria de Chart.js : https://www.chartjs.org/docs/latest
* Documentacion de Angular: https://v17.angular.io/docs

Para el uso del proyecto es necesario clonar el repositorio, abrir la carpeta iot > angular-iot.
Posteriormente ejecutar el comando "npm install"

Despues de haber instalados los paquetes, ejecutar el comando "ng serve" para correr de forma local el proyecto, este y automaticamente se conectara a la API de Ubidots y visualizara los ultimos datos capturados


Para el desplegue del proyecto, se hizo mediante AWS, especificamente el servicio de S3

# Desarrollo
El proyecto consistio en el desarrollo del Frontend (HTML, CSS), en la logica del Frontend (TypeScript), la primera que es el frontend, esta estructurado en HTML, entonces es habitual el uso de etiquetas, se visualiza informacion basica
pero se utiliza las variables de la logica del frontend para ciertos casos, como lo puede ser la grafica que usa la libreria Chart.js o las tablas, que es un componente de HTML que solo se le pasa un arreglo de objetos.

Al igual se contempla el desarrollo de servicios o services en ingles, en el cual estan las peticiones, las cuales son las siguientes:

* getDataTemperature() : Retorna un arreglo de objetos tipo Temperatura
* getDataHumedad() : Retorna un arreglo de objetos tipo Humedad
* getDataCo2() : Retorna un arreglo de objetos tipo CO2

Estos siendo los mas importantes a tomar en cuenta.

# Resultados 

Resultado de una pagina funcional, solo contar que el apartado de CO2 no se pudo visualizar como tal, debido a que hubo un error en la captura de CO2 con la placa ESP32 y el sensor ENS160+AHTX2, el codigo ya esta estructurado, en el dado caso que 
se cambie la direccion de la API a otro canal, y cambiar las variables, se ajustara de forma automatica y mostrara los datos en sus respectiva grafica y tablas, solo tomar en cuenta los Labels, DataSets de la grafica. 

La página del dashboard se encuentra en el siguiente link:
 
angular-iot-aws.s3.us-east-2.amazonaws.com/index.html
