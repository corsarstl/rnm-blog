# rnm-blog
PHP Academy course project

Bugs:

*** Register and Login modals backend errors are displayed in closed modals.

*** When publishing a new post, image is uploaded to aws s3 bucket, but all get request to display it on site
return 403 'access denied' despite I made bucket public, allowed in CORS configuration and bucket policy. 
Need to manually make each image or whole folder public.