const constants = require("./constants.js");
const mysql = require('mysql2/promise');

function FormatResult(result){
    if (!result) return "Sorry, I didn't found any doctor that meets your needs, try something different!";
    if (!result.length) return "Sorry, I didn't found any doctor that meets your needs, try something different!";
	
    var output = `These are the ${result.length} doctors we found for you:`;
    for (var i = 0; i < result.length; i++) {
    		output += (" Name: " + result[i].Provider_Full_Name);
			output += (" Address: " + result[i].Provider_Full_Street);
			output += (" City: " + result[i].Provider_Full_City);
   }
    return output;
}

async function SearchDoctors(DoctorName, ZipCode, Gender)
{	
	/*
	var speakOutput = `You just triggered a search for doctors with the following values:`;
	speakOutput += Gender ? ` gender = ${Gender}` : ``;
	speakOutput += ZipCode ? ` zipcode = ${ZipCode}` : ``;
	speakOutput += DoctorName ? ` name = ${DoctorName}` : ``;

	return speakOutput;
	*/

	//check params
 	if(!ZipCode && !DoctorName && !Gender)
		return "Sorry, I need more information to  search for doctors";

	//normalize gender
	if (Gender){
		if (Gender === 'male') Gender = 'M';
		if (Gender === 'm') Gender = 'M';
		if (Gender !== 'M') Gender = 'F';
	}

	var query = "SELECT Provider_Full_Name,Provider_Full_Street,Provider_Full_City FROM npidata2 WHERE (";
	if(DoctorName)
		query += "(Provider_Last_Name_Legal_Name = '" + DoctorName + "')";
	if(Gender)
		if(DoctorName)
			query += " AND (Provider_Gender_Code = '" + Gender + "')";
		else
			query += "(Provider_Gender_Code = '" + Gender + "')";
	if(ZipCode)
		if(DoctorName || Gender)
			query += " AND (Provider_Short_Postal_Code = '"+ ZipCode + "')";
		else
			query += "(Provider_Short_Postal_Code = '" + ZipCode + "')";
   	query += ") limit 3";

	try {
		const connection = await mysql.createConnection({
			host:constants.host,
			user:constants.user,
			password:constants.password,
			database:constants.database
		});
		await connection.connect();
		const [rows,fields] = await connection.query(query);
		await connection.end();
		return FormatResult(rows);
   	} catch(err) {
		return "Sorry, I didn't found any doctor that meets your needs. Try something different!";
		//return `error: ${err}`;
   	} 
} 

module.exports = SearchDoctors;