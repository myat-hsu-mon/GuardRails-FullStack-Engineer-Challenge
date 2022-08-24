class LimitQuery {
  public query;
  public queryString;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const excludedFields = ["page", "sort", "limit", "fields"];
    let filterFields = { ...this.queryString };
    excludedFields.map((el) => delete filterFields[el]);
    this.query = this.query.find(filterFields);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortFields);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const selectFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectFields);
    }
    return this;
  }

  paginate() {
    if (this.queryString.page) {
      const paginatePage = this.queryString.page * 1 || 1;
      const paginateLimit = this.queryString.limit * 1 || 10;
      const paginateSkip = (paginatePage - 1) * paginateLimit;
      this.query = this.query.skip(paginateSkip).limit(paginateLimit);
    } else if (this.queryString.limit) {
      this.query = this.query.limit(this.queryString.limit * 1);
    }
    return this;
  }
}

export default LimitQuery;
