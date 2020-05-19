# Processing COVID-19 Data from WHO.int

This repo intended to help Data Scientists and data processing professionals to handle and manage data related to the COVID-19 disease outbreak. I hope this information helps researchers to find new ways of analysis to defeat the COVID-10 disease outbreak, as well as empower them to solve more complex math calcs using less time.

**DISCLAIMER:** We all know how neccesary is to have a trusted analysis of the situation. Today the most accurate data in terms of global information is coming from WHO.int. Unfortunately the use of the API explained here is not licensed on any form so you must use it at your own risk.
This repo, the author and the tools used here are not related to WHO.int.

QCObjects Collab is licensed under LGPL v3 and the terms explained in this [LICENSE](https://github.com/QuickCorp/qcobjects-collab/blob/master/LICENSE.txt)

:::notes
- Keep in mind these are not only numbers, they are lives, they are people that we wished to save but we couldn't! They are people that we want to save using the resulting data of the fault. As a researcher you must to keep focus always in data but as a person you also have feelings and a soul. Please remember that when you show your analysis to the public.
:::


# Connecting to the API of WHO.int

The API of WHO.int used on this repo is at public access and is not licensed in any form. You have to use it at your own risk, with no warranty of uptime. Try not to abuse of the requests made to this API, it is recommended to only do a request once a day and save the response to a temporary file to not overuse and/or cause overload. There is not any individual data or private data present here. **Please use this information only for research purpose.**

## Connecting to the API and extract data

To connect to the API using cURL, create a shell file named ***./get-covid-19-data.sh*** and put inside the following code:

```shell
# file: ./get-covid-19-data.sh
curl 'https://dashboards-dev.sprinklr.com/data/9043/global-covid19-who-gis.json' \
  -H 'authority: dashboards-dev.sprinklr.com' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'origin: https://covid19.who.int' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'accept-language: es-ES,es;q=0.9,en;q=0.8' \
  -H 'if-none-match: "23ffd2d307702788a8553819a1431d24"' \
  -H 'if-modified-since: Mon, 18 May 2020 01:15:19 GMT' \
  --compressed
```

# Installing QCObjects Collab for Data Science

To work with the data, you can use [QCObjects Collab for Data Science](https://www.npmjs.com/package/qcobjects-collab) that is a Open Source  Engine that helps Data Scientists to automate data processing and collaborative analysis tasks.

QCObjects Collab uses a collaborative shell to do advanced math calcs usign ssh or unix-socket.

## Installing QCObjects Collab from Docker

To use QCObjects Collab from a Docker, you can pull the image from [quickcorp/qcobjects-collab](https://hub.docker.com/r/quickcorp/qcobjects-collab)

```shell
docker pull -a quickcorp/qcobjects-collab && docker run  -it --name qcobjects-collab --rm -it -p 10300:10300 quickcorp/qcobjects-collab
```

## Connecting to QCObjects Collab from external systems

You can use a TCP socket to connect yourself to the engine:

```shell
ssh user@0.0.0.0 nc 0.0.0.0 10300
```

You can also use a Unix Socket to connect yourself to the engine:

```
ssh user@0.0.0.0 nc -U /tmp/qcobjects-unix-socket
```

(change "user" for whathever your username is!)

If you are trying to access the server from the same machine you can use the IP 0.0.0.0 or if you're trynig to access it from an external network terminal you must use the corresponding IP and default port is 10300.

## Start QCObjects Collab in your local machine using NPM/NPX

To start using QCObjects Collab from your local machine without the need of starting a remote/cloud server, you need to have Node.js installed. Download and install Node.js from [here](https://nodejs.org/).

Once you have installed Node.js, you can use [npx](https://www.npmjs.com/package/npx) to call QCObjects Collab straight away in your shell console.

```shell
> npx qcobjects-collab
```

## Start QCObjects Collab in your local machine using QCObjects

If you either own [QCObjects Community Edition](https://qcobjects.com) or [QCObjects Enterprise Edition](https://qcobjects.com) you can run QCObjects Collab directly from a command line.

To install QCObjects just follow the steps [here](https://qcobjects.com/#installing)

To start QCObjects Collab from a command line, after installing QCObjects, just do this:

```shell
> qcobjects-collab
```

# Processing COVID-19 Data using QCObjects Collab

Once you have done the above steps, everything turns easy and handy. Inside the QCObjects Collab session, you can follow these instructions.

## Run .help to view the available commands and shortcuts

```shell
> qcobjects-collab
```

```shell
QCObjects Collab> .help
```

## Run .loadcmd_json command to extract the collected data into a variable

You can run the following command to extract the collected data from the response of executing the shell command **./get-covid-19-data.sh** into a variable stored in memory inside the QCObjects Collab session.

Enter to a QCObjects Collab session and do the following command:

```shell
QCObjects Collab> .loadcmd_json covid = ./get-covid-19-data.sh
```

The above command will save the response of the API into a global object called ***covid***. Then you can use this object to process the data and make calcs to reduce the result.

## Using examples of data processing

The file inside this repo, called **data-covid-processor.js** contains some quick start examples of processing the data. Here are some explanations of this examples:

### Helper functions

As QCObjects Collab is been written on JavaScript, you can enrich your runtime code using it, by example: creating runtime helper functions attached to the common Array prototype. Two useful functions to process data are ***unique*** (to collect only once for every single value element using ***objectList.unique()***) and ***table*** (to show a table representing the current list using ***objectList.table()***)

```javascript
//helper functions
Array.prototype.unique = function () {return this.filter((value,index,self) => self.indexOf(value) === index)}
Array.prototype.table = function () { console.table(this) }
```

### Formatting the columns

The most efficient way of process a list in JavaScript is using the map function. You can use it into QCObjects Collab to process **Array**, **ArrayList** and **ArrayCollection** objects (ArrayList and ArrayCollection objects are a part of QCObjects core framework and QCObjects SDK, that are automatically loaded into the QCObjects Collab session).

The API returns a tree object that contains three separate collections (***dimensions***, ***metrics*** and ***rows***)

```
|-- covid
     |-- dimensions
     |-- metrics
     |-- rows
```

To view the content of the **covid** variable just enter its name into QCObjects Collab and press [Enter]().

```shell
QCObjects Collab> covid
```

```shell
QCObjects Collab> covid.dimensions
```

```shell
QCObjects Collab> covid.metrics
```

```shell
QCObjects Collab> covid.rows.slice(0,10) // only get 10 rows
```

If you concat the elements of **dimensions** and **metrics** in the same order as they are collected, you can have a column name dictionary.

To create a **columns** variable that stores the name of the columns of the COVID-19 WHO API data, do the following:

```javascript
// format columns
columns = [""].concat(covid.dimensions.map(dimension => dimension.name).concat(
  covid.metrics.map(metric => metric.name)))
```

### Changing the structure of the data using the columns collection.

You can map **covid.rows** and store it into another variable called **data** which will contain the new structure based on **columns**.

```javascript
// format data using columns
data = covid.rows.map(row =>
   [{}].concat(row).reduce((accumulator, colData, index) => {
    return Object.assign(accumulator, {
      [columns[index]]: colData
    })
}))
```

### Get a dictionary of country names from the API collected data

To build a dictionary of country names you have to do the following:

```javascript
// Obtain only unique country names
countries = data.map(d => d["Country"]).sort().unique()
```

The above code will create a **countries** collection with data object mapped with a lambda function ```(d => d["Country"])``` that only returns the **Country** property of every element. Then, it will sort and filter the list to return only the unique elements.


### Calc the total amount of deaths in the world caused by COVID-19 disease

The following code maps the data to only return the Deaths property of every element, then reduces the data to to a signle value containing the total amount of deaths accumulated in the world caused by COVID-19 disease.

```javascript
// reduce the data to get total sum of deaths worldwide
cumulativeDeaths = data.map(d => d["Deaths"]).reduce(
                    (cumulative, deaths) => cumulative + deaths)
```

### Re-usable function to calc deaths by country

The following code defines a function called **getCumulativeDeathsByCountry** that accepts one parameter with the country value to filter the list, then map the filtered result to only get the **Deaths** property on every element and reduce the list to a single value with the sum.

```javascript
// a helper function to calculate deaths by country
getCumulativeDeathsByCountry = (country) => data.filter(
                                  d=>d["Country"]===country).map(
                                    d => d["Deaths"]).reduce(
                                      (cumulative, deaths) => cumulative + deaths)
```

To use this function you can do the following:

```javascript
cumulativeDeathsOfUSA = getCumulativeDeathsByCountry("US")
```

### Get the summary of deaths by country

The following code will create a single object with the summary of deaths by every country on the data

```javascript
// calculate cumulative deaths by every country
cumulativeDeathsByCountryObject = countries.map( country => {return {[country]:getCumulativeDeathsByCountry(country)}}).reduce ((prev,current) => Object.assign(prev,current))
```

To summarise the data into a list of objects with the pair country -> amount , do the following:

```javascript
// calculate cumulative deaths by every country
cumulativeDeathsByCountry = countries.map(country=> {return {"Country":country,"Deaths":getCumulativeDeathsByCountry(country)}})
```

```javascript
// order the list of deaths by country by descendent (most deaths first)
orderedDeathsByCountry = cumulativeDeathsByCountry.sort( (prev,current) => current.Deaths > prev.Deaths ? 1: -1)

```

_______
Be safe!
