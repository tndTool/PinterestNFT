import { Modal, Button } from "react-bootstrap";

interface Props {
  showModal: boolean;
  handleModalClose: () => void;
  handleModalNo: () => void;
  handleModalYes: () => void;
}

const ViewCreatePinModal: React.FC<Props> = ({
  showModal,
  handleModalClose,
  handleModalNo,
  handleModalYes,
}) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you want to mint this image?</Modal.Title>
      </Modal.Header>
      <Modal.Body>You have selected NFT</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalNo}>
          No
        </Button>
        <Button variant="danger" onClick={handleModalYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCreatePinModal;
