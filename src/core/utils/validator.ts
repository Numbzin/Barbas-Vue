export const validateName = (name: string): string => {
  const numberCount = (name.match(/\d/g) || []).length;
  const onlyNumbers = /^\d+$/.test(name);

  if (name.trim() === "") {
    return "Nome é obrigatório";
  }
  if (name.length < 4) {
    return "O nome deve ter pelo menos 4 caracteres";
  }
  if (onlyNumbers) {
    return "O nome não pode conter apenas números";
  }
  if (numberCount > 4) {
    return "O nome não pode ter mais de 4 números";
  }
  return "";
};

export const validateTelephone = (
  telephone: string
): { formattedValue: string; error: string } => {
  const value = telephone.replace(/\D/g, "");
  let formattedValue = value;

  if (value.length <= 11) {
    if (value.length > 2)
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9)
      formattedValue =
        formattedValue.slice(0, 10) + "-" + formattedValue.slice(10);
  }

  const telPattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  return {
    formattedValue,
    error: telPattern.test(formattedValue)
      ? ""
      : "Formato de telefone inválido",
  };
};

export const validateEmail = (email: string): string => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email) ? "" : "Formato de email inválido";
};

export const validatePassword = (password: string): string => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password)
    ? ""
    : "A senha deve conter ao menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, números e caracteres especiais";
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string => {
  return password === confirmPassword ? "" : "As senhas não coincidem";
};
