import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
// 	{
// 		id: "1",
// 		title: "Tech Talk: AI and the Future",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
// 		address: "123 Tech Street, San Francisco, CA",
// 		description:
// 			"Join us for a discussion on the latest developments in AI and how they will shape the future of technology. Expert speakers and live demos included.",
// 	},
// 	{
// 		id: "2",
// 		title: "Yoga for Beginners",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Skyline_of_Cannaught_Place%2C_New_Delhi.jpg/1024px-Skyline_of_Cannaught_Place%2C_New_Delhi.jpg",
// 		address: "456 Wellness Blvd, Los Angeles, CA",
// 		description:
// 			"Start your journey to wellness with this beginner-friendly yoga session. Learn basic poses, breathing techniques, and ways to relieve stress.",
// 	},
// 	{
// 		id: "3",
// 		title: "Photography Walk: Urban Landscape",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seimon_Ishibashi.JPG/1024px-Seimon_Ishibashi.JPG",
// 		address: "789 City Park, New York, NY",
// 		description:
// 			"Capture stunning urban landscapes during this photography walk. Whether you're a beginner or pro, bring your camera and explore the city's architecture.",
// 	},
// 	{
// 		id: "4",
// 		title: "Startup Networking Night",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg",
// 		address: "101 Business Ave, Chicago, IL",
// 		description:
// 			"Meet like-minded entrepreneurs and startups at this networking event. Perfect for finding collaborators, investors, or just exchanging ideas.",
// 	},
// 	{
// 		id: "5",
// 		title: "Book Club: Sci-Fi Classics",
// 		image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rainbow_colored_Rainbow_Bridge_at_night.jpg",
// 		address: "202 Library Lane, Seattle, WA",
// 		description:
// 			"This month’s book club discussion will focus on classic science fiction novels. Join us for lively conversation and book recommendations.",
// 	},
// ];

const HomePage = (props) => {
  return(
  <>
  <Head>
    <title>React Meeups</title>
    <meta 
    name="description"
     content="Browse a hue list of highly active React meetups!"
     />
  </Head> 
  <MeetupList meetups={props.meetups} />;
</>)
};
export async function getStaticProps() {
  console.log(process.env.MONGODB_URI);
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3,
  };
}

export default HomePage;
