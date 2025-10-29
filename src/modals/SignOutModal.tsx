import { Button } from "../components/shared/Button";
import BlockContainer from "../containers/public/BlockContainer";

interface ISignOutModalProps {
  onSubmit: () => void
}
const SignOutModal: ModalFC<ISignOutModalProps> = ({ onSubmit, onCancel }) => {
  return (
      <div className="flex flex-col items-center p-4 space-y-5">
        <p className="text-18 font-semibold ">You are about to be signed out</p>
        <p className="text-14">Are you sure you want to sign out?</p>
        <div className="flex justify-between  w-[100%] space-x-2">
          <Button onClick={onCancel} className="bg-ash-gray text-dusty-teal" >Cancel</Button>
          <Button onClick={() => { onSubmit(); if (onCancel) onCancel() }} >Confirm</Button>
        </div>
      </div>
  )
}
export default SignOutModal