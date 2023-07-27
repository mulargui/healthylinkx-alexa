const exec = require('await-exec');

// ====== searches for an Alexa skill by name =====
async function FindSkillIDByName(skillname) {
	var skillId;

	data = await exec(`ask smapi list-skills-for-vendor`); 
	data = JSON.parse(data.stdout); //parse the command results
	data.skills.every(function(element) {
		if (element.nameByLocale["en-US"] === skillname){
			skillId = element.skillId;
			return false;
		}
		return true;
	});
    return skillId;
}

module.exports = FindSkillIDByName;