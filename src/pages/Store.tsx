import { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";
interface StoreProps {}

const Store: FunctionComponent<StoreProps> = () => {
  const itemsElements = storeItems.map((item) => {
    return (
      <Col key={item.id}>
        <StoreItem item={item} />
      </Col>
    );
  });

  return (
    <>
      <Row lg={3} md={2} xs={1} className="g-3">
        {itemsElements}
      </Row>
    </>
  );
};

export default Store;
