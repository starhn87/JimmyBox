const fakeUser = {
  username: "Jimmy",
  loggedIn: false,
};

export const trending = (req, res) => {
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
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
