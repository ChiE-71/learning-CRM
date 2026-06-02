import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer($name: String, $address: String) {
    createCustomer(name: $name, address: $address) {
      id
    }
  }
`;

function CreateCustomer({ isModalVisible, setIsModalVisible, refetchQuery }) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [createCustomerMutation] = useMutation(CREATE_CUSTOMER_MUTATION);

  const saveCustomer = () => {
    createCustomerMutation({
      variables: {
        name: customerName,
        address: customerAddress,
      },
    }).then(() => {
      refetchQuery();
      setCustomerName("");
      setCustomerAddress("");
      setIsModalVisible(false);
    });
  };

  return (
    <Modal
      show={isModalVisible}
      onHide={() => {
        setIsModalVisible(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Customer</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Name
        <Form.Control
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        Address
        <Form.Control
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setIsModalVisible(false);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={saveCustomer}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CreateCustomer;
