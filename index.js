const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path'); // Make sure to include the path module
const moment = require('moment');

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
async function main() {
  await mongoose.connect(
    "mongodb+srv://siddhartha:haemolinkadmin@cluster0.x3n4iop.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Connected to MongoDB Database");
}
main();

app.get("/blogs", async (req, res) => {
  try {
    const blogData = await blog.find();
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error Retreiving Blog Post:", error);
    res.status(500).send("Error Retriving Blog Post");
  }
});
app.get("/blogPost", function (req, res) {
  res.render("blogPost");
});
const blogSchema = new mongoose.Schema({
  heading: String,
  description: String,
  image: String,
});
const blog = mongoose.model("blog", blogSchema, "blog-posts");
app.post("/post_blog", function (req, res) {
  console.log("Posting");
  const heading = req.body.heading;
  const description = req.body.content;
  const password = req.body.password;
  if (password === "rishav") {
    const newBlogPost = new blog({
      heading: heading,
      description: description,
    });
    async function saveBlogPost() {
      await newBlogPost.save();
    }
    saveBlogPost();
    console.log(newBlogPost);
  } else {
    res.send("Invalid Password / Contact Server Admin");
  }
});


app.get("/campaign", function (req, res) {
  res.render("campaign_form");
});
const campaignSchema = new mongoose.Schema({
  organisation: String,
  state: String,
  district: String,
  date:String,
  start_time:String,
  end_time:String,
  doctor:String,
  document:String
});
const campaign = mongoose.model("campaign", campaignSchema, "campaign-posts");
app.post("/post_campaign", function (req, res) {
  
  console.log("Posting");
  const org = req.body.organisation;
  const state = req.body.state;
  const district = req.body.district;
  const date = moment(req.body.date, 'YYYY-MM-DD').toDate();
  const start_time = moment(req.body.start_time, 'HH:mm').toDate();
  const end_time = moment(req.body.end_time, 'HH:mm').toDate();
  const doctor = req.body.doctor;
  const document = req.body.document;

  const newCampaignPost = new campaign({
    organisation: org,
    state: state,
    district: district,
    date:date,
    start_time:start_time,
    end_time:end_time,
    doctor:doctor,
    document:document
  });
  async function saveCampaignPost() {
    await newCampaignPost.save();
  }
  saveCampaignPost();
  console.log(newCampaignPost);
  res.send('Successfull');
});
app.get("/bloodcamps", async (req, res) => {
  try {
    const campaignData = await campaign.find();
    console.log(campaignData);
    res.json(campaignData);
  } catch (error) {
    console.error("Error Retreiving Campaign Post:", error);
    res.status(500).send("Error Retriving Blog Post");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
