
# Heroku cli commands

#### Create App In Heroku with add-ons

1. heroku apps:create <APP_NAME> --addons heroku-postgresql:hobby-dev,heroku-redis:hobby-dev,papertrail:choklad

2. heroku addons:create scheduler:standard -- default scheduler addon

3. heroku apps:destroy -a <APP_NAME> -- Destroy any specific app 

#### Deploy the code from local Git to heroku app

1. heroku git:remote -a <APP_NAME>  -- This would swithc our scope to specific application in heroku

2. git commit -m "commit for deploy to heroku"  -- Commitint any changes to git

3. git push heroku <Specific_Branch_You_Want_TO_Deploy>:master   -- deploying our changes to heroku

#### Generic commands for Heroku

1. heroku ps  --- Gives the current account snapshot 

2. heroku logs --ps web   -- Displays logs of web dyno

3. heroku ps:type  -a "app_Name"  -- Give the details of the dyno for specified app

4. heroku run -a <APP_NAME> df -h  -- Provides the snapshot for the current memory usage at dyno level 
 
