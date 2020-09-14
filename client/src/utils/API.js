import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getSongs: function () {
    return axios.get("/api/songs");
  },

  saveSong: function (songData) {
    return axios.post("/api/songs", songData);
  },
  updateSong: function (id, songData) {
    return axios.put("/api/songs/" + id, songData);
  },
  deleteSong: function (id) {
    return axios.delete("/api/songs/" + id);
  },

  addScore: function (scoreData) {
    return axios.post("/api/users/tests", scoreData);
  },

  getUserInfo: function () {
    let user = JSON.parse(localStorage.getItem("authUser")).user_name;
    return axios.get("/api/users/" + user);
  },
  getAllUserInfo: function () {
    return axios.get("/api/users/");
  },
};
