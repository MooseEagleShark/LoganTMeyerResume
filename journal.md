Some notes from my journey:

Set Up:

  12-31-21 - As I have been out of tech for nearly around 7 years, working primarily in non-tech construction /city development /airbnb, ect. coming back to tech (took some intro to computing classes as part of my Mechanical Eng. degree at CU Boulder, as well as always beign the 'tech guy' for the family) has been a welcome homecoming albeit there are a few things that I thought would be more 'cloud' streamlined now:

  Getting an IDE is still a pain on a mac. I was really hoping there would be a better cloud solution for this.  I was hoping that Github's Codespace would be everything I need with dependencies ect. but it turns out it's still beta only : (

  I used to use Text Wrangler or something and now it looks like people are using Atom.  Atom installed and partially set up.  I know I will still need to instal / learn python and mac compatabilities soon.

  For the record, I did instal Ubuntu on my Mac, but the driver for my wifi didn't automatically integrate and honestly managing all of this hardware and OS in the age of cloud seems way too 2010.  Kinda surprised someone hasn't figured out the Cloud IDE thing.

S3 bucket:

  somehow logan-resume bucket was available!  Turned s3 static website on.  Left versioning, encryption, and public access off for now.

  following the guide at: https://medium.com/avmconsulting-blog/host-your-static-website-in-aws-under-2-minutes-with-s3-a01237a83fda

  Got distracted and messed around with intelligent tiering for a while.  I wonder if html files getting auto-tiered to archive will mess up this resume website one day (like specifically 90 days from now)?

Route 53:
  Somehow HeyImLogan.com was available!  

  Alias vs. CNAME?

  First try with a cname pointed to arn:aws:s3:::logan-resume produced this error:
    Error occurred
    Bad request.
    (InvalidChangeBatch 400: RRSet of type CNAME with DNS name heyitslogan.com. is not permitted at apex in zone heyitslogan.com.)

  Looks like Alias record will work, but Route 53 wants an s3 "end point".

  Creating an "access point" in S3 hoping that it will do the same thing as an "end point".
    Update: It was not the same thing. deleted access point.

  In the S3 static website section they provide an endpoint.  Not sure if I can write the endpoint here publicly or not lol.

  Getting a 403 Forbidden Error code when trying to access http://logan-resume.s3-website.us-east-2.amazonaws.com/

  Looks like Route53 isn't recognizing the s3 endpoint that has been created.  I might try logging out and back in again?

CloudFront Requirement for HTTPS:  
  Knowing that cloudfront uses some neat tech of keeping website data cached at certain locations, this requirement seemed pretty intimidating initially.

  With the endpoint not being accepted by Route53 with a simple routing policy, I am going to skip ahead to see if Cloudfront access will be accepted by Route53?
