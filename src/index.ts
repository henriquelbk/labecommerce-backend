import { users, products, createUser, createProduct, getAllUsers, getAllProducts, searchProductsByName} from './database';

console.log("app iniciado");
console.log(users, products);

createUser("003", 'Fernando', 'fernando@email.com', 'askfjhap');
createProduct('p003', 'foguete a025', 335.000, 'Foguete grande', 'https://picsum.photos/seed/Rocket/400');
getAllUsers();
getAllProducts();
searchProductsByName('foguete a024');
