import { getCustomers } from "../service/getCustomer";
import { getConnection } from "typeorm";
import { Customer } from "../entity/customer";

jest.mock("typeorm", () => ({
  getConnection: jest.fn(),
}));

const mockFind = jest.fn();

(getConnection as jest.Mock).mockReturnValue({
  manager: {
    find: mockFind,
  },
});

describe("Customer service test group", () => {
  it("should return customer list", async () => {
    const fakeCustomers = [
      {
        id: 1,
        name: "John",
        address: "Brunei",
        createdDate: "2026-01-01",
      },
    ];

    mockFind.mockResolvedValue(fakeCustomers);
    const result = await getCustomers();

    expect(mockFind).toHaveBeenCalledWith(Customer);
    expect(result).toEqual(fakeCustomers);
  });
});
