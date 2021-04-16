import { users } from "./user";
import { stockFile } from "./stockFile";

const routes = []
.concat(users).concat(stockFile);

export { routes }