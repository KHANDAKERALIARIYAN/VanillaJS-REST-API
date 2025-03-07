// Import the 'fs' module with promises for asynchronous file operations
const fs = require('fs').promises;

// Import the 'path' module to handle and transform file paths
const path = require('path');

const readJsonFile = async (filename) => {

    try {
    
        const data = await fs.readFile(
    
            path.join(__dirname, '..', 'data', filename) 
    
        );
    
        return JSON.parse(data);
    
    } 
    catch (error) {
    
        return [];
    
    }

};

const writeJsonFile = async (filename, data) => {

    await fs.writeFile(
    
        path.join(__dirname, '..', 'data', filename),
    
        JSON.stringify(data, null, 2)
    
    );

};

module.exports = {

    readJsonFile,

    writeJsonFile

}; 