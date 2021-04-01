

export default class GenericValidation {


    static sanitizePagniation(pageSize, pageNumber) {
        if ( (pageSize == undefined || pageSize == null) && isNaN(pageSize) ) { pageSize = 10; }
        if ( isNaN(pageSize) ) { pageSize = 10; }
        if ( pageSize > 1000 || pageSize < 5 ) { pageSize = 10 } 

        if ( (pageNumber != undefined || pageNumber != null) && isNaN(pageNumber) ) { pageNumber = 1; }
        if ( isNaN(pageNumber) ) { pageNumber = 1; }
        if ( pageNumber > 1000 || pageNumber < 1 ) { pageNumber = 1 } 

        return { pageSize, pageNumber };
    }
}