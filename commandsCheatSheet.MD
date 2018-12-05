
# Heroku cli commands

#### Create App In Heroku with add-ons

heroku apps:create <APP_NAME> --addons heroku-postgresql:hobby-dev,heroku-redis:hobby-dev,papertrail:choklad

heroku addons:create scheduler:standard -- default scheduler addon

heroku apps:destroy -a <APP_NAME> -- Destroy any specific app 

#### Deploy the code from local Git to heroku app

heroku git:remote -a <APP_NAME>  -- This would swithc our scope to specific application in heroku

git commit -m "commit for deploy to heroku"  -- Commitint any changes to git

git push heroku <Specific_Branch_You_Want_TO_Deploy>:master   -- deploying our changes to heroku

#### Generic commands for Heroku

heroku ps  --- Gives the current account snapshot 

heroku logs --ps web   -- Displays logs of web dyno

heroku ps:type  -a "app_Name"  -- Give the details of the dyno for specified app

heroku run -a <APP_NAME> df -h  -- Provides the snapshot for the current memory usage at dyno level 
 
