export const trending = (req, res) => res.send("Homepage Videos");
export const see = (req, res) => {
  console.log(req.params);
  return res.send("Watch Video");
};
export const edit = (req, res) => res.send("Edit Video");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
