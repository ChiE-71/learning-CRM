import { getConnection } from "typeorm";
import { Customer } from "../entity/customer";

export async function getCustomers() {
  const connection = getConnection();
  return connection.manager.find(Customer);
}

