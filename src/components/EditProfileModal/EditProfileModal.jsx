import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState, useEffect } from "react";

const EditProfileModal = ({ handleCloseModal, isOpen, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });
  console.log("currentUser in EditProfileModal:", currentUser);
  console.log("currentUser.avatar:", currentUser?.avatar);

  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ profileData: data });
  };

  return (
    <ModalWithForm
      className="modal-with-form"
      title="Edit Profile"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Submit"
    >
      <div className="form__input-title-container">
        <label htmlFor="name" className="input-title">
          Name
          <input
            className="input-box"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            id="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form__input-title-container">
        <label htmlFor="url" className="input-title">
          Avatar URL
          <input
            className="input-box"
            type="url"
            name="avatar"
            minLength="1"
            maxLength="999"
            placeholder="Image URL"
            id="url"
            value={data.avatar}
            onChange={handleChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
