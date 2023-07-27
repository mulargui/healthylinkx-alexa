# healthylinkx-alexa
Healthylinkx helps you find doctors with the help of your social network. Think of Healthylinkx as a combination of Yelp, Linkedin and Facebook.

This is an early prototype that combines open data of doctors and specialists from the US Department of Health. It allows you to search for doctors based on location, specialization, genre or name. You can choose up to three doctors in the result list and Healthylinkx (theoretically) will book appointments for you.

Healthylinx is a classic three tiers app: front-end (ux), service API and data store. This architecture makes it very adequate to test different technologies and I use it for getting my hands dirty on new stuff. Enjoy!

This repo implements Healthylinkx using an Alexa skill as the front end. For each tier of the app, we use different AWS resources: RDS for the datastore, Lambda for the API and Alexa for the front-end.

To know more about the datastore this repo has more details https://github.com/mulargui/healthylinkx-mysql.git \
Likewise about the API using Lambda https://github.com/mulargui/healthylinkx-serverless.git

This repo is based and adapted from previous work to build an AWS Lex bot for healthylinkx https://github.com/mulargui/healthylinkx-lex.git

The healthylinkx-cli.sh shellscript allows you to create, update or delete any of the three tiers of the app in AWS. To work you need to have installed locally npm, nodejs, ask cli and mysql-client. To make things easier, there is a docker-healthylinkx-cli.sh shellscript that creates a docker image with these components. In this case you only need to have docker locally.

In order to access AWS you need to have environment variables with your account secrets. Use something like
export AWS_ACCESS_KEY_ID=1234567890 \
export AWS_SECRET_ACCESS_KEY=ABCDEFGHIJKLMN \
export AWS_ACCOUNT_ID=1234567890 \
export AWS_DEFAULT_REGION=us-east-1 \
export AWS_REGION=$AWS_DEFAULT_REGION 

Directories and files \
healthylinkx-cli.sh - this is the command line interface \
docker-healthylinkx-cli.sh - likewise but using docker \
/infra/src - healthylinkx-cli app source code to install, uninstall and update the whole app \
/infra/src/envparams.ts - All the parameters of the app, like datastore password... Fill in your data and save it before proceeding if you want to change the default values. \
/docker - dockerfile of the container

The API is implemented as a lambda written in nodejs. We just adapted the Lambda we had before to support Alexa call format \
/api/src - source code of the Lambda (node js)

The datastore is a RDS MySql instance and healthylinkx-cli creates the instance and uploads the data \
/datastore/data - dump of the healthylinkx database (schema and data)

The ux is an Alexa skill bot that is created and updated by healthylinkx-cli. \
/alexa/src contains the definition of the skill

At this time I only implemented to search for doctors by name, zipcode and gender. I'm a rookie in conversational interfaces, I have more experience in CLI or graphics (GUI or web) interfaces, and I struggle a little bit to define the conversation. This is quite basic but all the scalffolding is in place and is trivial to iterate and add more conversational features as I see fit. I plan to extend this interface in the future.

The Alexa documentation and tools rely heavily in the Alexa Developer console and manual work. I dislike this, I prefer to use code and files, update them in a repo and use an automated pipeline to update the services. This is the purpose of this repo. Deployment takes merely a few minutes including creating the skill in Alexa, create the Lambdas and the RDS datastore. Likewise to tear down everything. You can update the files of any component of the app and update the service in a matter of seconds. I follow an edit-deploy-test iteration cycle that is fast and secure.

The lambdas and datastore code has been proved during years and AWS APIs are stable - they should work for a long time. I cannot say the same about Alexa skill files. They don't have a great documentation of the files needed to fully describe an skill and many of them were discovered by trial and error. At this time it works but as Alexa changes and this is undocumented it can stop working. If you are in that situation, you can create a simple skill manually in the developer console, run the command below and diff with what is in the alexa/src folder.

<code> ask smapi export-package --skill-id amzn1.ask.skill.XXXXXXXX-XXX-XXX-XXX-XXXXXXXXXXXX --stage development </code>

Have fun using this repo!