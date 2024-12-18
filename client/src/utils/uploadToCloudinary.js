export const uploadToCloudinary = async(pics) => {

    if(pics){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: "post",
            body: data
        });

        const cloudinaryData = await res.json();
        return cloudinaryData.url.toString();
    } else {
        console.log("Error while file upload");
    }
}