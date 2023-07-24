import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  const [showFrom, setShowFrom] = useState<boolean>(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button
          variation="primary"
          size="medium"
          onClick={() => setShowFrom(!showFrom)}>
          Add cabin
        </Button>
        {showFrom && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
