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

export var transformPendingOrders = (orders) => {

    var result = {};

    var transformation = (order) => {
        var end_hr = order.end_hr;
        
        if(result[end_hr] === undefined)
            result[end_hr] = []

        result[end_hr].push(order)

    };

    orders.forEach(transformation);
    return result;

};


var createName = (type, index) => {

    var retailerName = () => {
        return String.fromCharCode(64+index);
    };

    var warehouseName = () => {
        return index;
    };

    switch (type) {
        case 'RETAILER':
            return retailerName();
        case 'WAREHOUSE':
            return warehouseName();
        default:
            return '';
    }

};

export var generateNames = (LayoutSpaces) => {

    var names = {};

    var storeName = (space, index) => {
        var type = space.description || 'WAREHOUSE';
        var id = space.space_id || space.space__space_id;
        names[id] = createName(type, index+1);
    };

    LayoutSpaces.forEach(storeName);
    return names;

};