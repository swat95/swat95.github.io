/** Format of response data from corona query api
  {
    "objectIdFieldName": "ObjectId",
    "uniqueIdField": {
        "name": "ObjectId",
        "isSystemMaintained": true
    },
    "globalIdFieldName": "",
    "fields": [
        {
            "name": "date",
            "type": "esriFieldTypeDouble",
            "alias": "date",
            "sqlType": "sqlTypeFloat",
            "domain": null,
            "defaultValue": null
        },
    ],
    "features": [
        {
            "attributes": {
                "date": 1624752000000,
                "deaths": 0,
                "cases": 39,
                "recovered": 1,
                "MeldeDatum": 1624752000000
            }
        }
    ]
}
*/

export interface FullResponse {
	objectIdFieldName?: string;
	uniqueIdField?: UniqueIdField;
	globalIdFieldName?: string;
	fields?: Fields[];
	features?: Features[];
	error?: Error;
}

export interface Error {
	details: string[];
	code: number;
	message: string;
}

export interface UniqueIdField {
	name: string;
	isSystemMaintained: boolean;
}

export interface Features {
	attributes: Attr;
}

/** Response data structure format for corona api */
export interface Attr {
	date: number;
	cases: number;
	recovered: number;
	deaths: number;
}

/** Type mapping info: https://doc.arcgis.com/de/insights/latest/get-started/supported-types-from-databases.htm */
export interface Fields {
	name: string;
	type: number;
	alias: string;
	sqlType: number;
	domain: null | string;
	defaultValue: null | string;
}
