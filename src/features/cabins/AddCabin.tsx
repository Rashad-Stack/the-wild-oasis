import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";
export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button size="medium" variation="primary">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="open-table">
        <Button size="medium" variation="primary">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="open-table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}
