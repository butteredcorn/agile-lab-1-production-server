Project Directory Structure
 
start server:
node bin/www

bin => server 
  |__www.js -> create server

public directory => static content 
  |__javascripts -> front-end js files
  |__stylesheets -> css files

routes => users requests routing module
  |__index.js -> route requests for public accessible end-points (index, login, register)
  |__users.js -> route requests for stricted access end-points (dashboard, download, logout)
  |__passport.js -> passport strategy configuration file

src => back-end content 
  |__data
  |   |__UserDB.js -> fake users database
  |   |__history_test.txt -> user history downloading test file
  |__covert.js -> temperature converting algorithms
  |__readline_stream.js -> read part of history content algorithms (reserved for future feature)

app.js => express server configuration file