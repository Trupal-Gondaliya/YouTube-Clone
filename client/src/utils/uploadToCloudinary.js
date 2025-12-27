import axios from "axios";

const uploadToCloudinary = async (file, fileType) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "youtube_clone_preset"); 
  
  // Choose the resource type: 'image' or 'video'
  const resourceType = fileType === "video" ? "video" : "image";
  const cloudName = "dqvfgww65"; 

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      data
    );

    const { secure_url } = res.data;
    return secure_url; 
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};

export default uploadToCloudinary;