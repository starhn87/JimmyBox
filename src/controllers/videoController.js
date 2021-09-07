import Video from "../models/Video";

export const home = (req, res) => {
  console.log("start");
  Video.find({}, (error, videos) => {
    console.log("Finished");
    return res.render("home", { pageTitle: "Home", videos: [] });
  });
};
export const watch = (req, res) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  return res.render("watch", {
    pageTitle: "Watch",
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: "Edit" });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
