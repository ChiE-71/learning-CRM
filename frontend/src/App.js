import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Col,
  Row,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Card,
} from "react-bootstrap";
import CreateCustomer from "./CreateCustomer";
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_CUSTOMERS_QUERY = gql`
  query getCustomers {
    getCustomers {
      id
      name
      address
      createdDate
    }
  }
`;

const DELETE_CUSTOMER_MUTATION = gql`
  mutation deleteCustomer($id: ID) {
    deleteCustomer(id: $id)
  }
`;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    loading,
    error,
    data,
    refetch: refetchQuery,
  } = useQuery(GET_CUSTOMERS_QUERY);

  const [deleteCustomerMutation] = useMutation(DELETE_CUSTOMER_MUTATION);

  const deleteCustomer = (id) => {
    deleteCustomerMutation(
      { variables: { id: id } }).then(() => {
        refetchQuery();
      });
  };

  return (
    <>
      <Navbar expand="lg" bg="primary" data-bs-theme="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">My CRM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Customers</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h2>Clients</h2>
        <Row>
          <Col xs={10}>
            {data?.getCustomers.map((client) => {
                return (
                  <Card className="customer_card">
                    <Card.Body>
                      <Card.Title>{client.name}</Card.Title>
                      <Card.Text>
                        {client.address}
                        <div className="date_created_card">
                          {client.createdDate}
                        </div>
                      </Card.Text>
                      <Button variant="outline-danger" size="sm" onClick={() => {
                        deleteCustomer(client.id);
                      }}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
          <Col>
            <Button variant="primary" onClick={() => setIsModalVisible(true)}>
              Create New
            </Button>
          </Col>
        </Row>

        <CreateCustomer
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          refetchQuery={refetchQuery}
        />
      </Container>
    </>
  );
}

export default App;
