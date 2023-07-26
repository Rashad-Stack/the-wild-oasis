import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div>
      <Button
        variation="primary"
        size="medium"
        onClick={() => setIsOpenModal(!isOpenModal)}>
        Add cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
