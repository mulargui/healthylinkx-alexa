#check if the image is already built, if not build it
if [ "$(docker images | grep node-ask-cli)" == "" ]; then
	docker build --rm=true -t node-ask-cli $PWD/docker
fi

#similar to healthylinkx-cli.sh but running inside a container to avoid to install node, npm...
docker run -ti --rm -v $PWD:/repo -v $HOME/.ask:/root/.ask \
	-w /repo/ \
	-e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_ACCOUNT_ID \
	-e AWS_REGION -e AWS_DEFAULT_REGION \
	node-ask-cli /bin/bash /repo/healthylinkx-cli.sh "$@"
