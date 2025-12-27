const providerModel = require('../models/sprovider.model');

async function getAllProviders(req,res) {
 
    const providers = await providerModel.find();
    return res.status(200).json({success:true,providers});
}

module.exports = {getAllProviders}