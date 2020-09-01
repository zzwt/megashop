import { useForm } from "react-hook-form";
import { Header, Form, Icon, Button, Message, Image } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { displayFormError, catchErrors } from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Auth from "../components/_App/Auth";
function CreateProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors, trigger, setValue } = useForm();

  useEffect(() => {
    register(
      { name: "name" },
      {
        required: "Name is required",
      }
    );
    register(
      { name: "price" },
      {
        required: "Price is required",
      }
    );
    register(
      { name: "media" },
      {
        required: "Media File is required",
      }
    );
    register(
      { name: "description" },
      {
        required: "Description is required",
      }
    );
  }, []);

  const bindValue = (event, { name, value }) => {
    if (name === "media") {
      setPreview(window.URL.createObjectURL(event.target.files[0]));
      return setValue(name, event.target.files[0]);
    }
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async (data, event) => {
    setSuccess(false);
    setLoading(true);
    setError(null);
    try {
      console.log(data);
      const mediaUrl = await handleImageUpload(data.media);
      const url = `${baseUrl}/api/product`;
      const payload = { ...data, mediaUrl };
      const response = await axios.post(url, payload);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
      event.target.reset();
      setPreview(null);
      clearFields();
    }
  };

  const clearFields = () => {
    setValue("name", null);
    setValue("price", null);
    setValue("media", null);
    setValue("description", null);
  };

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "megashop");
    data.append("cloud_name", process.env.CLOUD_NAME);
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    console.log(mediaUrl);
    return mediaUrl;
  };

  return (
    <>
      <Header block as="h2">
        <Icon name="add" color="orange"></Icon>
        Create New Product
      </Header>
      <Form
        loading={loading}
        success={success}
        error={Boolean(error)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Message header="Ooops, there're some issues" content={error} error />
        <Message
          success
          icon="check"
          header="Success"
          content="Product has been created."
        />
        <Form.Group widths="equal">
          <Form.Input
            error={displayFormError(errors, "name")}
            name="name"
            label="Name"
            type="text"
            placeholder="Name"
            onChange={bindValue}
          />
          <Form.Input
            error={displayFormError(errors, "price")}
            label="Price"
            type="number"
            name="price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            onChange={bindValue}
          />
          <Form.Input
            error={displayFormError(errors, "media")}
            label="Media"
            name="media"
            type="file"
            content="Select Image"
            accept="image/*"
            name="media"
            onChange={bindValue}
          />
        </Form.Group>
        {preview && <Image src={preview} centered rounded size="large" />}
        <Form.TextArea
          error={displayFormError(errors, "description")}
          label="Description"
          placeholder="Description"
          onChange={bindValue}
          name="description"
        />
        <Button
          content="Submit"
          icon="edit"
          color="twitter"
          disabled={loading}
          loading={loading}
          type="submit"
        />
      </Form>
    </>
  );
}

export default Auth(CreateProduct, "admin");
