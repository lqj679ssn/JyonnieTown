export class Category {
  en: string;
  cn: string;

  constructor({en, cn}) {
    this.en = en;
    this.cn = cn;
  }
}

export class Categories {
  categories: Array<Category>;

  constructor() {
    this.categories = new Array<Category>();
  }

  add(c: Category) {
    this.categories.push(c);
    return this;
  }

  get list() {
    return this.categories;
  }
}
