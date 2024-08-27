class APIFeatures{
    constructor(query,queryStr){
       this.query = query;
       this.queryStr = queryStr;
    }

    search(){
        let keyword = this.queryStr.keyword  ? {
            name: {
                $regex:this.queryStr.keyword,
                $options:'i' // no upercase or lower case 
            }
        }:{};
        this.query.find({...keyword})
        return this;
    }


   filter() {
    const queryStrCopy = { ...this.queryStr };

    // Log before removing fields
    console.log(queryStrCopy);

    // Removing fields from query
    const removingFields = ['keyword', 'limit', 'page'];
    removingFields.forEach(field => delete queryStrCopy[field]);

    // Log after removing fields
    console.log(queryStrCopy);

    // Convert to JSON string and replace operators with MongoDB format
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    // Log the transformed query string
    console.log(queryStr);

    // Parse the transformed query string into an object
    const queryObject = JSON.parse(queryStr);

    // Use the parsed query object for the find operation
    this.query.find(queryObject);

    return this;
}

paginate(resPerPage){
    const currentPage = Number(this.queryStr.page)|| 1;
    const skip = resPerPage * currentPage - 1
    this.query.limit(resPerPage).skip(skip);
    return this;

}

}

 module.exports = APIFeatures;