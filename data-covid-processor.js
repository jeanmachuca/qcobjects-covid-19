//.loadcmd_json covid = ./get-covid-19-data.sh

//helper functions
Array.prototype.unique = function () {return this.filter((value,index,self) => self.indexOf(value) === index)}
Array.prototype.table = function () { console.table(this) }

// format columns
columns = [""].concat(covid.dimensions.map(dimension => dimension.name).concat(
  covid.metrics.map(metric => metric.name)))

// format data using columns
data = covid.rows.map(row => [{}].concat(row).reduce((accumulator, colData, index) => {
  return Object.assign(accumulator, {
    [columns[index]]: colData
  })
}))

// Obtain only unique country names
countries = data.map(d => d["Country"]).sort().unique()

//console.table(data.slice(0, 10))

// reduce the data to get total sum of deaths worldwide
cumulativeDeaths = data.map(d => d["Deaths"]).reduce((cumulative, deaths) => cumulative + deaths)


// a helper function to calculate deaths by country
getCumulativeDeathsByCountry = (country) => data.filter(d=>d["Country"]===country).map(d => d["Deaths"]).reduce((cumulative, deaths) => cumulative + deaths)

// calculate cumulative deaths by every country
cumulativeDeathsByCountry = countries.map(country=> {return {"Country":country,"Deaths":getCumulativeDeathsByCountry(country)}})

// calculate cumulative deaths by every country, organising data into a single object
cumulativeDeathsByCountryObject = countries.map( country => {return {[country]:getCumulativeDeathsByCountry(country)}}).reduce ((prev,current) => Object.assign(prev,current))

// order the list of deaths by country by descendent (most deaths first)
orderedDeathsByCountry = cumulativeDeathsByCountry.sort( (prev,current) => current.Deaths > prev.Deaths ? 1: -1)

//console.table(orderedDeathsByCountry)
