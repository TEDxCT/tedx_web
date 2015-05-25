#bash generate_reports.sh

#environment
if [ ! $1 ]; then
        echo "Example of use: bash import_videos staging"
        exit 1
fi
env=$1

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


perl -pi -e 's/field_video_description/description/g' videos.json
perl -pi -e 's/field_video_title/name/g' videos.json
perl -pi -e 's/field_video_embed/embed_url/g' videos.json
perl -pi -e 's/field_video_value/value/g' videos.json
perl -pi -e 's/field_video_provider/provider/g' videos.json
perl -pi -e 's/field_video_data/data/g' videos.json
perl -pi -e 's/field_video_duration/duration/g' videos.json
perl -pi -e 's/field_video_value/value/g' videos.json


mongoimport -h $host -d $mongo_db -c videos -u $user -p $pass --file videos.json --jsonArray

mongo $host/$mongo_db --eval "db.videos.find({})"




