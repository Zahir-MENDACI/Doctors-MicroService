import * as admin from "firebase-admin"

export class Utils {
    private static instance: Utils;


    constructor() {
        console.log("Created new instance of Utils");
    }

    static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }

    listActions(inputSort: string, inputRange: string, filter: string) {
        let parsedSort: string[];
        let parsedRange: number[];
        let parsedFilter: Object;
        let startRange: number;
        let endRange: number;
    
        if (inputRange == undefined) {
          const pagination: number = 9;
          inputRange = `[0, ${pagination}]`;
        }
    
        if (inputSort != null && inputSort != undefined && inputSort.length > 0) {
          parsedSort = JSON.parse(inputSort);
          console.log(parsedSort);
        }
    
        if (inputRange != null && inputRange != undefined && inputRange.length > 0) {
          parsedRange = JSON.parse(inputRange);
          startRange = +parsedRange[0];
          endRange = +parsedRange[1];
        }
    
        if (filter != null && filter != undefined && filter.length > 0) {
          parsedFilter = JSON.parse(filter);
          console.log(parsedFilter);
        }
    
        return { sort: parsedSort, range: parsedRange, filter: parsedFilter, startRange: startRange };
      }

      listActionsDAO(dbRef: FirebaseFirestore.CollectionReference, sort?: string[], range?: number[], filter?: any, resource?: string) {
        let keys: string[];
        let field: string;
        let order: string;
        let query: admin.firestore.Query;
    
        query = dbRef;
    
        // If there is no range, we use this by default
        if (range !== undefined) {
            const start = range[0];
            const end = range[1];
            query = query.limit(end + 1 - start).offset(start);
        }
    
    
    
        if (sort || filter) {
          if (!(typeof filter == "undefined") && Object.keys(filter).length != 0) {
            if (filter.from === "all") {
              delete filter.from;
            }
    
            keys = Object.keys(filter);
            keys.map((key) => {
              query = query.where(key.toString(), "==", filter[key.toString()]);
            });
          }
          if (sort) {
            field = sort[0];
            order = sort[1];
            if (field == "id") {
              field = "createdAt";
            }
            if (field) {
              if (filter != undefined) {
                keys = Object.keys(filter);
                if (!((field == keys[0]?.toString()) || (field == keys[1]?.toString()) || (field == keys[2]?.toString()))) {
                  query = query.orderBy(field, order == "DESC" ? "desc" : "asc");
                }
              } else {
                query = query.orderBy(field, order == "DESC" ? "desc" : "asc");
              }
            }
          }
        }
    
        console.log(typeof query);
    
        return query;
      }
    
}
