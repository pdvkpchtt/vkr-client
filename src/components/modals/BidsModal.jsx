import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";

import { TextareaAutoResize } from "../../shared/ui/TextareaAutoResize";
import Button from "../../shared/ui/Button";
import { BidSchema } from "../../validation/index";

import { createBid } from "../../server_actions/createBid";

import CrossIcon from "../../shared/icons/CrossIcon";

const BidsModal = ({ setModal = () => {} }) => {
  const ref = useRef();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = async () => {
    const validatedFields = BidSchema.safeParse(formData);

    console.log(validatedFields?.error?.formErrors?.fieldErrors);
    if (!validatedFields.success) {
      ref?.current?.focus();
      setError(validatedFields?.error?.formErrors?.fieldErrors);
      return;
    }

    setError(null);

    startTransition(async () => {
      const res = await createBid(formData);

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      toast.success("Заявка успешно создана!");
      setModal(false);
    });
  };

  return (
    <div className="p-[12px] flex flex-col gap-[12px]">
      <div className="flex flex-row justify-end">
        <CrossIcon onClick={() => setModal(false)} />
      </div>

      <TextareaAutoResize
        disabled={isPending}
        ref={ref}
        placeholder={`Опишите детали заявки`}
        label="Детали заявки"
        rows={2}
        value={formData.description}
        onChange={(description) => setFormData({ description })}
        error={error?.description && error?.description[0]}
      />

      <Button
        text="Создать"
        onClick={handleSubmit}
        loading={isPending}
        disabled={isPending}
      />
    </div>
  );
};

export default BidsModal;
