const interchanges = require('../interchanges.json').locations;

const createData = () => {
    let ids = {};
    let distances = {};
    for (const [key, value] of Object.entries(interchanges)) {
        distances[parseInt(key)] = value.routes[0].distance;
        ids[value.name] = parseInt(key);
    }
    return { ids: ids, distances: distances };
}

const calculateTripCost = function (req, res, next) {
    try {
        let startPos = req.body.start_position;
        let finalPos = req.body.end_position;
        let totalDist = 0;
        const data = createData();

        //Validation for invalid start or end position
        validatePosition(startPos, finalPos,data, res)

        if (startPos != finalPos) {
            let id1 = data.ids[startPos];
            let id2 = data.ids[finalPos];
            if (id1 > id2) {
                [id1, id2] = [id2, id1];
            }

            //Loop on the lists of ids from start and end positions
            for (let i = id1; i < id2; i++) {
                if (data.distances.hasOwnProperty(i))
                    totalDist += data.distances[i];
            }
            charge = totalDist * 0.25;
        } else {
            return res.status(404).json({ "error": "Please enter valid start position and end position" });
        }
        return res.status(200).json({ "Distance": (totalDist).toFixed(2), "Cost": (charge).toFixed(2) });
    } catch (error) {
        next(error)
    }
}

const validatePosition = function (startPos, finalPos,data, res) {
    if (data.ids[startPos] === undefined || data.ids[finalPos] === undefined) {
        return res.status(404).json({ "error": "Please enter valid start position and end position" });
    }

    if (startPos == "" || finalPos == "" || typeof startPos === 'number' || typeof finalPos === 'number') {
        return res.status(404).json({ "error": "Please enter valid start position and end position" });
    }
}

module.exports = calculateTripCost;