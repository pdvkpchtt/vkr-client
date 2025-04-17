import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";

import Input from "../../shared/ui/Input";
import CurrencyInput from "../../shared/ui/CurrencyInput";
import Button from "../../shared/ui/Button";
import { HistorySchema } from "../../validation/index";

import { createHistory } from "../../server_actions/createHistory";

import CrossIcon from "../../shared/icons/CrossIcon";

const SetHistoryModal = ({ setModal = () => {}, bidId = null }) => {
  const ref = useRef();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ description: "", run: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = async () => {
    const validatedFields = HistorySchema.safeParse(formData);

    console.log(validatedFields?.error?.formErrors?.fieldErrors);
    if (!validatedFields.success) {
      ref?.current?.focus();
      setError(validatedFields?.error?.formErrors?.fieldErrors);
      return;
    }

    setError(null);

    startTransition(async () => {
      const res = await createHistory({
        bid_id: bidId,
        ...formData,
      });

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      toast.success("Готово!");
      setModal(false);
    });
  };

  return (
    <div className="p-[12px] flex flex-col gap-[12px]">
      <div className="flex flex-row justify-end">
        <CrossIcon onClick={() => setModal(false)} />
      </div>

      <Input
        disabled={isPending}
        ref={ref}
        placeholder={`Опишите детали работы`}
        label="Детали работы"
        value={formData.description}
        onChange={(description) => setFormData({ ...formData, description })}
        onEnterPress={handleSubmit}
        error={error?.description && error?.description[0]}
      />
      <CurrencyInput
        disabled={isPending}
        placeholder={`Укажите пробег авто`}
        label="Пробег авто"
        value={formData.run}
        onChange={(run) => setFormData({ ...formData, run })}
        onEnterPress={handleSubmit}
        error={error?.run && error?.run[0]}
      />

      <Button
        text="Готово"
        onClick={handleSubmit}
        loading={isPending}
        disabled={isPending}
      />
    </div>
  );
};

export default SetHistoryModal;
