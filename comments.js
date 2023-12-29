// Create web server
// 1. Import express
const express = require('express')
const app = express()
const port = 3000

// 2. Import express-handlebars
const exphbs = require('express-handlebars')

// 3. Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 4. Setting static files
app.use(express.static('public'))

// 5. Import restaurant.json
const restaurantList = require('./restaurant.json')

// 6. Setting routes
// Index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// Show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// Search page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 7. Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})