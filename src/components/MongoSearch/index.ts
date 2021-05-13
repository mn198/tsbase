import logging from "../../config/logging";
import { Utils } from "../Utils/utils";
import mongoose from 'mongoose';

var ObjectId = mongoose.Types.ObjectId;

const namespace = "MONGOOSE_SEARCH_PARSER"

// var payload = {
//     condition: [{
//         field: "_id",
//         compareOperator: "$eq",
//         type: "objectId",
//         value: "6054afc332d31b2ab4820972",
//     }],
//     sort: {
//         orderBy: 'createdAt',
//         direction: 'des'
//     }
// }

export interface ICondition {
    field: string;
    compareOperator: '$eq' | '$gt' | '$lt' | '$gte' | '$lte' | '$ne' | '$in';
    type: 'string' | 'number' | 'date' | 'array' | 'boolean' | 'objectId';
    value: any;
}

export interface IOrder {
    orderBy: string;
    direction: 'des' | 'asc';
}

interface IMongoParserClass {
    toMatches(condition: ICondition[]): any[];
    toSort(order: IOrder): object;
}

class MongoParserClass implements IMongoParserClass{
    toSingleMatch(filter_object: ICondition[]) {
        let filter: any = {};
        filter_object.forEach((item: ICondition) => {
            filter[item.field] = {};
            filter[item.field][item.compareOperator] = this.convertType(item.type, item.value, item.compareOperator);
        });
        return filter;
    }

    toMatches(filter_object: [ICondition]) {
        var filter_group: any = [];
        if (!filter_object || !Array.isArray(filter_object)) {
            return filter_group;
        }
        logging.debug(namespace, "filter object", filter_object)

        filter_object.forEach((item: ICondition) => {
            var filter: any = {
                $match: {}
            };
            logging.debug(namespace, "operator", JSON.stringify(item));
            filter['$match'][item.field] = {};
            filter['$match'][item.field][item.compareOperator] = this.convertType(item.type, item.value, item.compareOperator);
            filter_group.push(filter);
        });
        logging.debug(namespace, "condition", JSON.stringify(filter_group));
        return filter_group;
    }

    toSort(order_option: IOrder) {
        let sort: any = {};
        let order: number = -1;
        if (!order_option.orderBy) {
            return sort;
        }
        if (order_option.direction === 'des') {
            order = -1;
        }
        if (order_option.direction === 'asc') {
            order = 1;
        }
        sort[order_option.orderBy] = order;
        return sort;
    }

    private convertType(type: string, value: any, operator: any) {
        let convertedValue: any;
        if (type === 'boolean') {
            convertedValue = Boolean(value);
        }
        if (type === 'number') {
            convertedValue = +value;
        }
        if (type === 'string') {
            if (value) {
                convertedValue = value.toString().trim();
            } else {
                convertedValue = '';
            }
        }
        if (type === 'date') {
            convertedValue = new Date(value);
            if (operator === '$gt' || operator === '$gte') {
                convertedValue = new Date(Utils.startOfDay(value));
            }
            if (operator === '$lt' || operator === '$lte') {
                convertedValue = new Date(Utils.endOfDay(value));
            }
        }
        if (type === 'array') {
            if (Array.isArray(value)) {
                convertedValue = value;
            } else {
                convertedValue = [];
            }
        }
        if(type === 'objectId'){
            convertedValue = ObjectId(value);
        }
        return convertedValue;
    }
}

export const MongoSearchParser = new MongoParserClass();
