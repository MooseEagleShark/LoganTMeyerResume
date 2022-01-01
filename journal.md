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

  Hmm, Still getting S3 access Denied errors at heyitslogan.com.

  Fixed, the access issues for s3 using: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html#bucket-policy-static-site

  Still getting an access denied message on the cloudfront distribution though...

  finally got it to work by pointing to http://heyitslogan.s3-website-us-east-1.amazonaws.com.  DOC-EXAMPLE-BUCKET.s3.amazonaws.com.  AWS documentation for the win!

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

  Darn, looks like both the cloudfront domain name and ARN aren't valid targets?  Not sure what the heck is going on here : (

    Alright, stack overflow! https://stackoverflow.com/questions/30611917/cloudfront-distribution-not-showing-as-route53-alias-target

    1. Only A records and AAAA are supported. Not CNAME records.
    2. The Route53 "Alias Target" box matches against CloudFront distributions' "Alternate Domain Names" field. If you're creating a new record set for something.example.com, you should have already set the alternate domain name for one of your distributions to something.example.com.

    Also, had to request an SSL certificate for use with HTTPS.  Stored in AWS certificate Manager.

    FIXED!  Still not sure why Route 53 wasn't allowing me to point to the S3 static website though...

CloudFront Requirement for HTTPS:  
  Knowing that cloudfront uses some neat tech of keeping website data cached at certain locations, this requirement seemed pretty intimidating initially.

  With the endpoint not being accepted by Route53 with a simple routing policy, I am going to skip ahead to see if Cloudfront access will be accepted by Route53?

  Did not include an ALB as it seemed overkill but could be cool in the future?

  Settings:
    compression on
    HTTPS only
    Allowed HTTP methods:
      Get,
      head
    restrict viewer access:
      off

    Function Associations: No idea what these are

    Price Class:
    North America and Europe (getting very curious how much this whole configuration will cost lol)

javascript website counter:
  first google link is here, for making a pure javascript counter.  Since we will want to integrate with dynamoDB, this is a good starting point, but will need to be modified.  --> https://contactmentor.com/build-website-visitor-counter-javascript/



CI/CD using Github actions to push HTML/CSS/JS code to S3 bucket
  Found a guide to do this using codepipeline here -> https://medium.com/avmconsulting-blog/automate-static-website-deployment-from-github-to-s3-using-aws-codepipeline-16acca25ebc1

  Wow, since the article was written AWS has further streamlined the integration process where they simply took me to Github's website to confirm the integration and AWS pretty much took it from there with the exception of me specifing where I wanted the artifacts to go to.  Didn't even have to specify Github webhooks during the codepipeline setup.  I'm curious how this data is pushed / pulled behind the scenes?...

  UPDATE: Wow, it just... worked?  That was a lot simpler process than integrations that I remember from 10 years ago using webhooks and REST apis and all sorts of annoying details.

  Update: Definitely running into the Cloudfront cacheing the css issue. I'll have to find a solution for that...

  Looks like the options are to use versioning on the css file name or to use AWS CLI to invalidate the file.  The problem with the latter is that amazon charges if you run over a certain amount of invalidation requests.  I'll have to look into versioning the css...  Tried appending href="style.css?v=1" but the actual style.css file seems to still be getting cached? hmm... maybe i can run an occasional invalidation of the css file using the API Gateway when I get to that point...

AWS Serverless Application Model (SAM) to create:
  API Gateway, Lambda function with Python, and DynamoDB for website visitor counter
    Where to start?  I'll have to make another repository first for the backend stuff.
