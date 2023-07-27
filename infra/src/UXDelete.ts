
const constants = require('./envparams.ts');
const FindSkillIDByName = require('./alexautil.ts');

const exec = require('await-exec');

// ====== deletes the Healthylinkx Alexa skill =====
async function UXDelete() {
	try {
		// search for the healthylinkx skill id
		skillId = await FindSkillIDByName(constants.SKILLNAME);
		await exec('ask smapi delete-skill --skill-id ' + skillId); 
		console.log("Success. healthylinkx skill " + skillId + " deleted.");
	} catch (err) {
		console.log("Error. ", err);
	}
}

module.exports = UXDelete;