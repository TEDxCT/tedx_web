#bash generate_reports.sh

#environment
if [ ! $1 ]; then
        echo "Example of use: bash import_videos staging"
        exit 1
fi
env=$1

if [ $env != "local" ]; then
	echo "";
else
	echo "local"
	host=127.0.0.1:3001
	mongo_db=meteor
	user="ted"
	pass="ted"
fi;

if [ $env != "staging" ]; then
	echo "";
else
	echo "staging"
	host=ds031942.mongolab.com:31942
	mongo_db=heroku_app37129234
	user="tedxct"
	pass="staging!@#4"
fi;

if [ $env != "production" ]; then
	echo "";
else
	echo "production";
	# host=ds031942.mongolab.com:31942
	# mongo_db=heroku_app37129234
fi;

# node videos.js


# mysql -u [user] -p[pass] -e "[mysql commands]"
# mysql -h "https://arya.texo.co.za:2083" -u "carla" "333" "tedxcape_drup" < "videos.sql"

# perl -pi -e "s/field_video_description/description/g" videos.json
# perl -pi -e "s/title/\"name\"/title/g" videos.json
# perl -pi -e "s/field_video_embed/\"url\"/g" videos.json
# perl -pi -e "s/field_video_provider/provider/g" videos.json
# perl -pi -e "s/field_video_data/data/g" videos.json
# perl -pi -e "s/field_video_duration/duration/g" videos.json
# perl -pi -e "s/field_video_value/videoId/g" videos.json
# perl -pi -e "s/\{/{/g" videos.json
perl -pi -e "s/\"published\": 1/\"published\": true/g" videos.json

# perl -pi -e "s/\"name\":/\"\"name\"\":/g" videos.json

# perl -pi -e "s/\"name\":/\"\"name\"\":/g" videos.json
# perl -pi -e "s/\"web\"url\"s\":/\"\"web\"url\"s\"\":/g" videos.json


mongo $host/$mongo_db -u $user -p $pass --eval "db.videos.drop()"

mongoimport -h $host -d $mongo_db -c videos -u $user -p $pass --file videos.json --jsonArray

mongo $host/$mongo_db --eval "db.videos.find({})"
