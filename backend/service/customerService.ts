import { getConnection } from "typeorm";
import { Customer } from "../entity/customer";

export async function createCustomer(name: string, address: string) {
  const connection = getConnection();

  const customer = new Customer();
  customer.name = name;
  customer.address = address;
  customer.createdDate = new Date().toLocaleDateString("en-CA");

  return connection.manager.save(customer);
}

export async function deleteCustomer(id: number) {
  const connection = getConnection();

  const user = await connection.manager.findOne(Customer, {
    where: { id: Number(id) },
  });

  if (!user) return false;

  await connection.manager.remove(user);
  return true;
}

