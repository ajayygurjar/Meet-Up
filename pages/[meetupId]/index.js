import MeetupDetail from "@/components/meetups/MeetupDetail";


const MeetingDetails = () => {

	return <>
	<MeetupDetail image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"
	 title='First Meetup'
	  address='Some Street 5,Some City'
	   description='This is a first meetup'
	    />
	</>
};

export async function getStaticPaths()
 {
	return {
		fallback:false,
		paths:[
			{params:{
				meetupId:"1",
			}},
			{params:{
				meetupId:"2",
			}},
			{params:{
				meetupId:"3",
			}}
		]
	}

	
}


export async function getStaticProps (context) {
	const meetupId=context.params.meetupId;
	console.log(meetupId)
	return {
		props:{
			meetupData:{
				image:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
				id:'1',
				title:'Tech Talk: AI and the Future',
				address:'456 Wellness Blvd, Los Angeles, CA',
				description:'Start your journey to wellness with this beginner-friendly yoga session. Learn basic poses, breathing techniques, and ways to relieve stress.',
			}
		}
	}

}
export default MeetingDetails;