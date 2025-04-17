import { useEffect, useRef, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import Wrap from "../../../shared/ui/Wrap";
import RoleSelector from "../../../components/auth/RoleSelector";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { LoginSchema } from "../../../validation";
import TextLink from "../../../shared/text/TextLink";

const LoginPage = () => {
  const ref = useRef();
  const navigate = useNavigate();

  const [role, setRole] = useState("driver");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const validatedFields = LoginSchema.safeParse(formData);

    if (!validatedFields.success) {
      ref?.current?.focus();
      setError(validatedFields?.error?.formErrors?.fieldErrors);
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const token = await fetch(`http://127.0.0.1:8000/${role}/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .catch((err) => {
            return { error: "Что-то пошло не так" };
          })
          .then((res) => {
            if (res.status >= 400) return res.json();

            if (!res || !res.ok) {
              toast.error("Что-то пошло не так");
              return;
            }

            return res.json();
          })
          .then((data) => {
            if (!data) {
              toast.error("Что-то пошло не так");
              return;
            } else return data;
          });

        if (token?.detail) toast.error(token?.detail);
        else {
          toast.success("Успех!");

          Cookies.set("app_token", token, { expires: 1 });
          window.location.reload();

          return;
        }
      } catch (err) {
        toast.error("Что-то пошло не так");
        return;
      }
    });
  };

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-[12px] items-center justify-center">
      <p className="font-bold text-[#2c2c2c] text-[24px]">Добро пожаловать</p>

      <Wrap style="max-w-[500px] mx-auto">
        <RoleSelector role={role} setRole={setRole} />
        <Input
          disabled={isPending}
          ref={ref}
          placeholder={`${role}@gmail.com`}
          label="Почта"
          value={formData.email}
          onChange={(email) => setFormData({ ...formData, email })}
          onEnterPress={handleSubmit}
          error={error?.email && error?.email[0]}
        />
        <Input
          disabled={isPending}
          type="password"
          placeholder={"••••••••"}
          label="Пароль"
          value={formData.password}
          onChange={(password) => setFormData({ ...formData, password })}
          onEnterPress={handleSubmit}
          error={error?.password && error?.password[0]}
        />

        <Button
          text="Войти"
          style="mt-[18px]"
          onClick={handleSubmit}
          loading={isPending}
        />
      </Wrap>

      <TextLink text="Нет аккаунта?" to="/register" />
    </div>
  );
};

export default LoginPage;
