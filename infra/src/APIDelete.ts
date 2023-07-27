const { 
	IAMClient, 
	DeleteRoleCommand 
} = require("@aws-sdk/client-iam");
const {
    LambdaClient,
    DeleteFunctionCommand
} = require("@aws-sdk/client-lambda");

//lamdba node dependencies
const nodedependencies = 'mysql2 axios';

// ======== helper function ============
function sleep(secs) {
	return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

// ====== create lambdas and API gateway =====
async function APIDelete() {

	try {
		//delete the lambdas
		const lambda = new LambdaClient({});		
		await lambda.send(new DeleteFunctionCommand({FunctionName: 'healthylinkx-alexa-lambda'}));
		console.log("Success. healthylinkx-alexa-lambda lambda deleted.");

		//delete the IAM role
		const iamclient = new IAMClient({});
		await iamclient.send(new DeleteRoleCommand({RoleName: 'healthylinkx-lambda'}));
		console.log("Success. Lambda role deleted.");
	
	} catch (err) {
		console.log("Error. ", err);
	}
}

module.exports = APIDelete;
