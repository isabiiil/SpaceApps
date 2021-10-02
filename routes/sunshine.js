const express = require("express");
const router = express.Router();

router.get("/getLatLon", async (req, res, next) => {
    const { address } = req.query; // Gets user address
  
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
  
    console.log("ADDRESS: ", address);
  
    if (address === "") {
      return res.status(200).send("Empty");
    }

    var location;
    
    try {
        let res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            address.replace(" ", "+") +
            "&key=AIzaSyD0Oqqgq6mtQZRagceG4LvDm2N0uXis3wM"
        );

        const lt = res.data.results[0].geometry.location.lat;
        const ln = res.data.results[0].geometry.location.lng;

        location = { lt , ln }
    } catch (err) {
        console.log(err);
    }
  
    console.log(location);
  
    res.status(200).send(location);
  });

module.exports = router;