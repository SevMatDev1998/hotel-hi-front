import { Button } from "../components/shared/Button";
import { useTranslation } from "../hooks/useTranslation";

interface ISignOutModalProps {
  onSubmit: () => void
}
const SignOutModal: ModalFC<ISignOutModalProps> = ({ onSubmit, onCancel }) => {
  const {t} = useTranslation();
  return (
      <div className="flex flex-col items-center  space-y-10 bg-white p-5 rounded-lg">
        <p className="text-18 font-semibold ">{t("auth.are_you_sure_logout")}</p>
        <div className="flex justify-between  w-[100%] space-x-2">
          <Button onClick={onCancel} className="bg-ash-gray text-dusty-teal" >{t("buttons.cancel")}</Button>
          <Button onClick={() => { onSubmit(); if (onCancel) onCancel() }} >{t("buttons.yes")}</Button>
        </div>
      </div>
  )
}
export default SignOutModal