var {setUserCredentials, setLayoutSpace} = require('Actions');

export var initiateReset = function (dispatch) {
    dispatch(setLayoutSpace([]));
    dispatch(setUserCredentials(null, null));
    localStorage.removeItem('gameDetails');
    localStorage.removeItem('gameDetailsHash');
};

export var transformWarehouses = (warehouses) => {

    var result = {};

    var transformation = (warehouse) => {
        result[warehouse.space_id] = warehouse;
    };
    warehouses.forEach(transformation);

    return result; 
};

export var transformDemands = (demands) => {

    var result = {};

    var transformation = (demand) => {
        var space_id = demand.space_id;
        
        if(result[space_id] === undefined)
            result[space_id] = []

        result[space_id].push(demand)

    };

    demands.forEach(transformation);

    return result;
}