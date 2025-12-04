import styles from './FAQ.module.css';

const FAQ = () => {
    return(
        <div className={styles.container}>
        <div className ={styles.content}>
            <h2 className = {styles.title}>FAQ</h2>
            <div className={styles.divider}></div>
            <h1 className={styles.greeting}>We're here to Support!</h1>
            <div className={styles.QandA}>
                <div className = {styles.question}>When and where is ElleHacks?</div>
                <p className = {styles.answer}>ElleHacks will be hosted at York University (Keele Campus) in Toronto, Ontario, Canada on January 2026.</p>
                <div className = {styles.question}>What's a hackathon?</div>
                <p className = {styles.answer}>At ElleHacks, you'll get to make tons of new friends, network with recruiters, and pick up cool skills through workshops, speaker sessions, activities, and games!</p>
                <div className = {styles.question}>Do I need to know how to code?</div>
                <p className = {styles.answer}>Nope! Students of all skill levels are welcome at ElleHacks (even if you have absolutely zero experience)! Tons of hackathon participants are total newbies, and we'll be there to support you through workshops and mentorship. :) Still not sure? Check this out for inspiration: https://medium.com/tfogo/hackathons-are-for-beginners-77e9c9cb000#.cj21niskl</p>
                <div className = {styles.question}>Who can apply?</div>
                <p className = {styles.answer}>We welcome all students from underrepresented gender groups (i.e., women and gender-diverse students) who either live or attend school in North America. Only students who are currently enrolled at a high school or college/university, or have graduated within the past 12 months, are eligible to attend. You must bring a valid student or government-issued ID card for admission.</p>
                <div className = {styles.question}>What in-person accomodations are available?</div>
                <p className = {styles.answer}>Hackers have the option of staying overnight! You're free to come and go as you please. Sleeping rooms will be provided.</p>
                <div className = {styles.question}>When is the last day to sign up?</div>
                <p className = {styles.answer}>Applications will open closer to the event date. The deadline to apply is TBD.</p>
                <div className = {styles.question}>Will there be swag?</div>
                <p className = {styles.answer}>Yes!!</p>
                <div className = {styles.question}>Do I need to find a team?</div>
                <p className = {styles.answer}>At ElleHacks, we welcome you to compete in teams of 1-4 students. ➝ If you already have a team, we’ll ask you to list their names during registration, the first day of the event. ➝ If you’d like to look for teammates later, we’ll open our Discord server a week early for you to search for a team. ➝ If you’d like help finding a team, we can match you with a team before or on the first day of the event.</p>
                <div className = {styles.question}>Can I start working on my project before the event?</div>
                <p className = {styles.answer}>No. All participants are required to start and complete their project during the hackathon. Any project that starts before the event will be disqualified.</p>
                <div className = {styles.question}>Can I submit a project I've used at another hackathon/school assignment/anywhere else?</div>
                <p className = {styles.answer}>No.</p>
            </div>
        </div>
        </div>
    );
};
export default FAQ;