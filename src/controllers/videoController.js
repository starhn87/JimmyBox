const videos = [
  {
    title: "First",
    rating: 5,
    comments: 2,
    createdAt: "2 min ago",
    views: 50,
    id: 1,
  },
  {
    title: "Second",
    rating: 2,
    comments: 4,
    createdAt: "4 min ago",
    views: 68,
    id: 2,
  },
  {
    title: "third",
    rating: 3.5,
    comments: 21,
    createdAt: "6 min ago",
    views: 179,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  const video = videos[id - 1];
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: video.title });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };

  videos.push(newVideo);

  return res.redirect("/");
};
