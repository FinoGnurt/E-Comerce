const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
<<<<<<< HEAD
  formData.append("upload_preset", "kieuvantrung_cloudinary");
=======
  formData.append("upload_preset", "do_an_co_so");
>>>>>>> 861afa5c3a68129035d4e86c274022d0c607f45c

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadImage;
