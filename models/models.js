const sequelize = require('../db');
const {DataTypes} = require('sequelize'); // datatypes для описания типов полей

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const BasketBook = sequelize.define('basket_book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.STRING, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
});

const BookInfo = sequelize.define('book_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.INTEGER, allowNull: false}
});

const TypeAuthor = sequelize.define('type_author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketBook);
BasketBook.belongsTo(Basket);

Type.hasMany(Book);
Book.belongsTo(Type);

Author.hasMany(Book);
Book.belongsTo(Author);

Book.hasMany(Rating);
Rating.belongsTo(Book);

Book.hasMany(BasketBook);
BasketBook.belongsTo(Book);

Book.hasMany(BookInfo, {as: 'info'});
BookInfo.belongsTo(Book);

Type.belongsToMany(Author, {through: TypeAuthor});
Author.belongsToMany(Type, {through: TypeAuthor});

module.exports = {
    User,
    Basket,
    BasketBook,
    Book,
    Type,
    Author,
    Rating,
    TypeAuthor,
    BookInfo
};