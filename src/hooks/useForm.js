import { useState } from "react";

export function useForm(inputData) {
  const [data, setData] = useState(inputData);

  const handleChange = (event) => {
    const { name, password, email, avatarURL } = event.target;
    setData({
      ...data,
      [name]: data.name,
      [password]: data.password,
      [email]: data.username,
      [avatarURL]: data.avatarURL,
    });
  };
  return { data, handleChange, setData };
}
