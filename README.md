# rnm-blog
PHP Academy course project

Available online here: https://tinyurl.com/ybkgdr3t

Bugs:

*** When publishing a new post, image is uploaded to aws s3 bucket, but all get request to display it on site
return 403 'access denied' despite I made bucket public, allowed in CORS configuration and bucket policy. 
Need to manually make each image or whole folder public.