var {setUserCredentials, setLayoutSpace} = require('Actions');

export var initiateReset = function (dispatch) {
    dispatch(setLayoutSpace([]));
    dispatch(setUserCredentials(null, null));
    localStorage.removeItem('gameDetails');
    localStorage.removeItem('gameDetailsHash');
    setTimeout(initiateBubbles, 100);
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

export var CreateSupplyProgress = (existing, supply) => {

    var new_supply = [];
    var from = supply.source_space_id;
    var to = supply.destination_space_id;
    var qty = supply.quantity
    var flag = true;

    for(var k in existing) {
        var current = existing[k];
        if (current.source_space_id === from && current.destination_space_id === to) {
            flag = false;
            current = {
                ...current,
                quantity: current.quantity + qty
            };
        }
        new_supply.push(current);
    }

    if(flag)
        new_supply.push(supply);

    return new_supply;

};

var CalcDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
};

export var TransportTime = (x1, y1, x2, y2, time_per_unit_distance) => {
    var distance = CalcDistance(x1, y1, x2, y2);
    return Math.ceil(distance * time_per_unit_distance);
};

export var transformPendingWarehouses = (warehouses) => {

    var result = {};

    var transformation = (warehouse) => {
        var end_hr = warehouse.active_from;
        
        if(result[end_hr] === undefined)
            result[end_hr] = []

        result[end_hr].push(warehouse)

    };

    warehouses.forEach(transformation);
    return result;

};

export var transformPendingSupplies = (supplies) => {

    var result = {};

    var transformation = (supply) => {
        var end_hr = supply.supply_end;
        
        if(result[end_hr] === undefined)
            result[end_hr] = []

        result[end_hr].push({
            source_space: supply.source_space,
            dest_space: supply.dest_space,
            supply_qty: supply.supply_qty,
            supply_end: supply.supply_end
        });

    };

    supplies.forEach(transformation);
    return result;

};

export var transformPopularity = (popularities) => {
    var result = {};

    var transformation = (popularity) => {
        result[popularity.rid] = {
            user: popularity.user,
            opponent: popularity.opponent
        }
    };

    popularities.forEach(transformation);
    return result;

}