//Add variables to require the necessary dependencies
const express = require('express'),
router = express.Router(),
data = require('./data.json').projects,
app = express();
app.use(router);

//set your “view engine” to “pug”
app.set('view engine', 'pug');
app.set('views', './views');

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

//An "index" route (/) to render the "Home" page with the locals set to data.projects
router.get("/", (req, res) => {
  res.render("index", { data })
});

//An "about" route (/about) to render the "About" page
router.get("/about", (req, res) => {
  res.render("about");
});

//Dynamic "project" routes (/project/:id or /projects/:id) based on the id of the project
router.get("/project/:id", (req, res, next) => {
  const projectId = parseInt(req.params.id);

  if (projectId > data.length-1 || projectId < 0 || isNaN(projectId)) {
    const err = new Error(`Project ${req.params.id} not found`);
    err.status = 404;
    next(err);
  } else {
    res.render("project", { project: data[projectId] });
  }
});

//Handle errors for invalid routes
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = router;

//app should listen on port 3000, and log a string to the console that says which port the app is listening to.
app.listen(3000, () => console.log(`Listening on port 3000`));