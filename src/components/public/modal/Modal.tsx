 import { Button } from "../../ui/Button";

interface IModalProps {
  onSubmit: () => void
}
const Modal: ModalFC<IModalProps> = ({ onSubmit, onCancel }) => {
  return (
    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => { onSubmit(); if (onCancel) onCancel() }}>
        Confirm
      </Button>
    </div>
  )
}
export default Modal