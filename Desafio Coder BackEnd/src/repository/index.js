import { userRepository } from "./users.repository.js";
import { usersDao } from "../dao/factory.js";

import { productRepository } from "./products.repository.js";
import { productDao } from "../dao/factory.js";

export const userService = new userRepository(usersDao);

export const productService = new productRepository(productDao);