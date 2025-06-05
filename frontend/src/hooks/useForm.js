import { useState } from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido",
  },
};

export default function useForm(type) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setError("Campo obrigatório");
      return false;
    }

    if (type === "password") {
      if (value.length < 8) {
        setError("A senha deve ter no mínimo 8 caracteres");
        return false;
      }
      if (!/[A-Z]/.test(value)) {
        setError("A senha deve conter pelo menos 1 letra maiúscula");
        return false;
      }
      if (!/[a-z]/.test(value)) {
        setError("A senha deve conter pelo menos 1 letra minúscula");
        return false;
      }
      if (!/\d/.test(value)) {
        setError("A senha deve conter pelo menos 1 número");
        return false;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        setError("A senha deve conter pelo menos 1 caractere especial");
        return false;
      }

      setError(null);
      return true;
    }

    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}
