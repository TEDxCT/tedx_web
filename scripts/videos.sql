SELECT 
          GROUP_CONCAT(
               CONCAT("{name:""",speaker.name,""),
               CONCAT(",webURLs:""",speaker.webURLs,"""}")
          ) AS speaker, bio.field_bio_value AS  "description", 
video.title AS  "title", 
video_data.field_video_embed as "url", 
video_data.field_video_value as "videoId",
video_data.field_video_provider as "provider",
video_data.field_video_duration as "duration",
video_data.field_video_data as "data",
term.json as "old_categories", true as "published"
FROM dr_content_field_speakerref AS speakerref
left outer JOIN dr_node AS video ON speakerref.vid = video.vid
left outer JOIN dr_content_field_bio AS bio ON speakerref.field_speakerref_nid = bio.nid
left JOIN dr_content_type_video as video_data on video_data.vid = speakerref.vid
LEFT OUTER JOIN (
	SELECT node.nid, CONCAT("[",
          GROUP_CONCAT(
               CONCAT("{name:""",name,"""}")
          )
     ,"]") AS json
	FROM dr_term_node AS node
	INNER JOIN dr_term_data AS data ON data.tid = node.tid
	GROUP BY node.nid
) AS term ON speakerref.field_speakerref_nid = term.nid

LEFT OUTER JOIN (
	SELECT speaker.title AS  "name", website.json as "webURLs", website.nid
FROM dr_content_field_speakerref AS speakerref
INNER JOIN dr_node AS speaker ON speakerref.field_speakerref_nid = speaker.nid
INNER JOIN (
	SELECT node.nid,  CONCAT("[",
          GROUP_CONCAT(
               CONCAT("{url:""",field_bio_website_url,""),
               CONCAT(",title:""",field_bio_website_title,"""}")
          )
     ,"]") AS json
	FROM dr_content_field_bio_website AS node
	GROUP BY node.nid
) AS website ON speakerref.field_speakerref_nid = website.nid
group by website.nid
) AS speaker ON speakerref.field_speakerref_nid = speaker.nid
WHERE video.type =  'video'

group by video.vid


