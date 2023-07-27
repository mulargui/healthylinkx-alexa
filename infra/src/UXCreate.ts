
const constants = require('./envparams.ts');

const fs = require('fs');
const replace = require('replace-in-file');
const exec = require('await-exec');

const skilldir = constants.ROOT + '/alexa/src';
const skillpackagedir = constants.ROOT + '/alexa/src/skill-package';
const filePath = constants.ROOT + '/alexa/src/';

// ====== creates the Healthylinkx Alexa skill =====
async function UXCreate() {
	
	try {		
		// create ask-resources.json with lambda region
		fs.copyFileSync(skilldir + '/ask-resources.template.json', skilldir + '/ask-resources.json');
		options = {
			files: skilldir + '/ask-resources.json',
			from: [/AWS_REGION/g],
			to: [process.env.AWS_REGION]
		};
		await replace(options);

		// create skill.json with lambda endpoints
		fs.copyFileSync(skillpackagedir + '/skill.template.json', skillpackagedir + '/skill.json');
		options = {
			files: skillpackagedir + '/skill.json',
			from: [/AWS_REGION/g, /AWS_ACCOUNT_ID/g],
			to: [process.env.AWS_REGION, process.env.AWS_ACCOUNT_ID]
		};
		await replace(options);

		//create the Alexa skill
		data = await exec("ask deploy --target skill-metadata --ignore-hash", {cwd: skilldir}); 
		//in case you want to see the output of the commmand
		//consolue.log ("ask command stdout: " + JSON.parse(data.stdout)); 

		//remove resources created
		await fs.unlinkSync(skillpackagedir + '/skill.json');
		await fs.unlinkSync(skilldir + '/ask-resources.json');

		console.log("Success. healthylinkx Alexa skill created");
	} catch (err) {
		console.log("Error. ", err);
	}
}

module.exports = UXCreate;