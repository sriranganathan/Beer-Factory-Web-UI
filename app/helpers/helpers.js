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
        result[warehouse.space__space_id] = warehouse;
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
};

export var convertHrtoDays = (hr) => {

    var day = Math.floor(hr/24) + 1;
    var hr = hr % 24;

    return {
        day,
        hr
    };

};

export var transformCostTypes = (costTypes) => {
    var result = {};

    var transformation = (costType) => {
        result[costType.cost_code] = costType
    };
    
    costTypes.forEach(transformation);
    return result;

};

export var transformActions = (actions) => {
    var result = {};

    var transformation = (action) => {
        result[action.action_code] = action
    };
    
    actions.forEach(transformation);
    return result;

};

export var transformUpgrades = (upgrades) => {

    var result = {};

    var transformation = (upgrade) => {
        result[upgrade.level] = upgrade
    };
    
    upgrades.forEach(transformation);
    return result;

};