import React, { useState } from "react";
import "./ApplicationForm.css";
// import Navbar from "../../../components/Navbar/Navbar.jsx";

// Import images from the assets folder
import partyPopper from "../../../assets/ApplicationForm/party-popper.png";
import balloon10 from "../../../assets/ApplicationForm/balloon-10.png";
import headphones from "../../../assets/ApplicationForm/headphones.png";
import balloonsStriped from "../../../assets/ApplicationForm/balloons-striped.png";
import balloonsSolid from "../../../assets/ApplicationForm/balloons-solid.png";
import flask from "../../../assets/ApplicationForm/flask.png";
import banner from "../../../assets/ApplicationForm/header-banner.png";
import info from "../../../assets/ApplicationForm/info-banner.png";
import country from "../../../assets/ApplicationForm/country-banner.png";
import interest from "../../../assets/ApplicationForm/interest-banner.png";
import york from "../../../assets/ApplicationForm/york-banner.png";

function App() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredFirstName: "",
    pronouns: "",
    email: "",
    phone: "",
    ageOnEvent: "",
    country: "",
    province: "",
    city: "",
    disability: "",
    indigenousIdentity: "",
    ethnicity: [],
    otherEthnicity: "",
    levelOfStudy: "",
    school: "",
    graduationYear: "",
    fieldOfStudy: "",
    hackathonsAttended: "",
    attendedElleHacksBefore: "",
    yorkStudentNumber: "",
  });

  const [isNavActive, setIsNavActive] = useState(false);
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {  // Handle form input changes
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        ethnicity: checked
          ? [...prev.ethnicity, value]
          : prev.ethnicity.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {  // Submit form data to backend (for now)
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* Header Section */}
      <header className="header">
        <img src={banner} alt="Banner" className="header-banner"/>
        <h1>ElleHack 2026 - Hacker Application</h1>
      </header>

      {step === 1 && 
        <>
          {/* About Section */}
          <section className="info-card">
            <img src={partyPopper} alt="Party popper" className="decor party-popper" />
            <img src={balloon10} alt="Balloon shaped like the number 10" className="decor balloon-10" />
            <p className="italics">
              This form will only take about 10 minutes of your time. Keep your
              resume close by! No skill-testing or long questions involved 🙂
            </p>
            <p className="deadline">
              🕒 <strong>Application Deadline:</strong> IDK YET @ 11:59 PM
            </p>
            <h3>👧 What is ElleHacks?</h3>
            <p>
              Hello! We’re ElleHacks, one of Canada’s largest hackathons for women &
              gender-diverse students! This event will take place on{" "}
              <strong>January 23–25, 2026</strong> from Friday afternoon to Sunday
              evening at York University’s Keele campus in Toronto, Ontario. We have
              overnight accommodations, but you are not required to stay overnight.
            </p>
            <h2>Some Frequently Asked Questions</h2>
            <h3>💻 What’s a hackathon?</h3>
            <p>
              A hackathon is a competition where students work together to design
              solutions for a given challenge. You’ll meet new friends, network with
              recruiters, and pick up cool skills through workshops, speaker
              sessions, and games.
            </p>
            <h3>🧠 Who can sign up?</h3>
            <p>
              Women & gender-diverse students in high school or post-secondary who
              study or live in North America!
            </p>
            <h3>💜 What if I can’t code or not a STEM student?</h3>
            <p>
              That’s okay! Many participants are total beginners — we’ll be there to
              help you along the way.
            </p>
            <h3>🩷 Do I need a team?</h3>
            <p>
              You’re welcome to compete in teams of 1–4 students. Don’t have a team?
              We’ll help you find one on the first day!
            </p>
            <p className="socials"><strong>📸 Follow us on socials @ellehacks !</strong></p>
          </section>

          <div className="agreement">
            <p className="italics"><strong>I understand that ElleHacks is
              an event for marginalized gender groups. Preference will be given
              to these groups when selecting accepted hackers.*</strong></p>
            <label><input type="radio" required />Yes, I understand.</label>
            <img src={headphones} alt="Headphones" className="decor headphones" />
            <div className="button-row">
              <button className="btnNext" onClick={nextStep}>Next</button>
            </div>
          </div>
        </>
      }

      {step === 2 &&
        <>
          {/* Participant Info */}
          <div className="section-header">
            <img src={info} alt="Info banner" className="section-banner"/>
            <h2>Participants Information</h2>
          </div>
          <section className="form-section">
            <div className="form-grid">
              <label>First Name*<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="ex. Mary" required /></label>
              <label>Last Name*<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="ex. Smith" required /></label>
              <label>Preferred First Name<input type="text" name="preferredFirstName" value={formData.preferredFirstName} onChange={handleChange} /></label>
              <label>Pronouns*<input type="text" name="pronouns" value={formData.pronouns} onChange={handleChange} required /></label>
              <label>Email Address*<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex. mary.smith@example.com" required /></label>
              <label>Phone Number*<input type="phone" name="phone" value={formData.phone} onChange={handleChange} required /></label>
              <label>What will be your age as of January 23, 2026?*<input type="number" name="ageOnEvent" value={formData.ageOnEvent} onChange={handleChange} min="13" required /></label>
            </div>
            <div className="button-row">
              <button className="btnBack" onClick={prevStep}>Back</button>
              <button className="btnNext" onClick={nextStep}>Next</button>
            </div>
          </section>
        </>
      }
          
      {step === 3 &&
        <>  
          {/* Country Background Section */}
            <div className="section-header">
              <img src={balloonsSolid} alt="Balloons" className="decor balloons-participant" />
              <img src={country} alt="Country banner" className="section-banner"/>
              <h2>Country Background</h2>
            </div>
            <section className="form-section">
                <div className="form-grid">
                  <label>
                    Which country do you reside in?*
                    <select name="country" value={formData.country} onChange={handleChange} required>
                      <option value=""></option>
                      <option>Canada</option>
                    </select>
                  </label>
                  <label>
                    Please specify your province/territory*
                    <select name="province" value={formData.province} onChange={handleChange} required>
                      <option value=""></option>
                      <option>Yukon</option>
                      <option>Northwest Territories</option>
                      <option>Nunavut</option>
                      <option>British Columbia</option>
                      <option>Alberta</option>
                      <option>Saskatchewan</option>
                      <option>Manitoba</option>
                      <option>Ontario</option>
                      <option>Quebec</option>
                      <option>New Brunswick</option>
                      <option>Prince Edward Island</option>
                      <option>Nova Scotia</option>
                      <option>Newfoundland and Labrador</option>
                    </select>
                  </label>
                  <label>
                    Please specify your city/town (For Ontario Residents)*
                    <select name="city" value={formData.city} onChange={handleChange} required>
                      <option value=""></option>
                      <option>Toronto</option>
                      <option>Vaughan</option>
                      <option>Markham</option>
                      <option>Richmond Hill</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>

                <p className="italics">
                  According to the Accessible Canada Act, disability means "any impairment, 
                  including a physical, mental, intellectual, cognitive, learning, communication or sensory impairment—or 
                  a functional limitation—whether permanent, temporary or episodic in nature, or evident or not, that in 
                  interaction with a barrier, hinders a person’s full and equal participation in society".
                </p>

                <div className="radio-block">
                  <p><strong>Do you identify as a person with a disability as described in the Accessible Canada Act?</strong></p>
                </div>
                <div className="radio-group">
                  <label><input type="radio" name="disability" value="Yes" onChange={handleChange} />Yes</label>
                  <label><input type="radio" name="disability" value="No" onChange={handleChange} />No</label>
                  <label><input type="radio" name="disability" value="Prefer not to answer" onChange={handleChange} />Prefer not to answer</label>
                </div>

                <div className="radio-block">
                  <p><strong>Do you identify as First Nations, Inuit, and/or Métis?</strong></p>
                </div>
                <div className="radio-group">
                  <label><input type="radio" name="indigenousIdentity" value="Yes" onChange={handleChange} />Yes</label>
                  <label><input type="radio" name="indigenousIdentity" value="No" onChange={handleChange} />No</label>
                  <label><input type="radio" name="indigenousIdentity" value="Prefer not to answer" onChange={handleChange} />Prefer not to answer</label>
                </div>

                <p><strong>Which of the following ethnic or racial categories best describes how you self-identity? Select all that apply.</strong></p>
                <div className="checkbox-grid">
                  <label><input type="checkbox" name="ethnicity" value="Black" onChange={handleChange} />Black [African, African-Canadian, Afro-Caribbean descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="East Asian" onChange={handleChange} />East Asian [Chinese, Japanese, Korean, Taiwanese descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Indigenous" onChange={handleChange} />Indigenous [First Nations, Inuk/Inuit, Métis]</label>
                  <label><input type="checkbox" name="ethnicity" value="Latin American" onChange={handleChange} />Latin American [Hispanic or Latin American descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Middle Eastern" onChange={handleChange} />Middle Eastern [Arab, Persian, West Asian descent (e.g. Afghan, Egyptian, Iranian, Kurdish, Lebanese, Turkish)]</label>
                  <label><input type="checkbox" name="ethnicity" value="South Asian" onChange={handleChange} />South Asian [South Asian descent (e.g., Bangladeshi, Indian, Indo-Caribbean, Pakistani, Sri Lankan)]</label>
                  <label><input type="checkbox" name="ethnicity" value="Southeast Asian" onChange={handleChange} />Southeast Asian [Cambodian, Filipino, Indonesian, Thai, Vietnamese, or other Southeast Asian descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Caucasian" onChange={handleChange} />Caucasian [European descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Prefer not to answer" onChange={handleChange} />Prefer not to answer</label>
                  <label>
                    <input type="checkbox" id="other" name="ethnicity" value="Other" onChange={handleChange} />
                    Other: <input type="text" id="otherText" name="otherEth" value={formData.otherEthnicity} onChange={handleChange} />
                  </label>
                </div>

                <div className="button-row">
                  <button className="btnBack" onClick={prevStep}>Back</button>
                  <button className="btnNext" onClick={nextStep}>Next</button>
                </div>
            </section>
        </>
      }
          
      {step === 4 &&
        <>
          {/* Education & Interests Section */}
          <div className="section-header">
            <img src={balloonsStriped} alt="Striped balloons" className="decor balloons-country-bg" />
            <img src={interest} alt="Interest banner" className="section-banner"/>
            <h2> Educational Background & Interests</h2>
          </div>
          <section className="form-section">
              <div className="form-grid">
                <label>
                  What is your current level of study?*
                  <select name="levelOfStudy" value={formData.levelOfStudy} onChange={handleChange} required>
                    <option value=""></option>
                    <option>High School</option>
                    <option>Undergraduate</option>
                    <option>Graduate</option>
                  </select>
                </label>
                <label>Which school do you attend?*<input type="text" name="school" value={formData.school} onChange={handleChange} required /></label>
                <label>
                  Expected graduation year? (For post-secondary students)*
                  <select name="graduationYear" value={formData.graduationYear} onChange={handleChange} required>
                    <option value=""></option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                  </select>
                </label>
                <label>What is your field of study?*<input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required /></label>
                <label>How many hackathons have you previously attended?*<input type="number" min="0" name="hackathonsAttended" value={formData.hackathonsAttended} onChange={handleChange} required /></label>
              </div>    
              <br></br>        
              <label id="attendedLabel">
                  Have you attended ElleHacks before?*
                  <div className="radio-group">
                    <label><input type="radio" name="attended" value="Yes" onChange={handleChange} />Yes</label>
                    <label><input type="radio" name="attended" value="No" onChange={handleChange} />No</label>
                  </div>
              </label>

              <div className="button-row">
                <button className="btnBack" onClick={prevStep}>Back</button>
                <button className="btnNext" onClick={nextStep}>Next</button>
              </div>
          </section>
        </>  
      }
          
      {step === 5 &&
        <> 
          {/* YorkU Student Section */}
          <div className="section-header yorku-header">
            <img src={york} alt="YorkU banner" className="section-banner yorku"/>
            <h2>YorkU Students Only</h2>
          </div>
          <section className="form-section yorku-section">
            <img src={flask} alt="Flask" className="decor flask" />
              <label>Please enter your Student Number below<input type="text" placeholder="" name="yorkStudentNumber" value={formData.yorkStudentNumber} onChange={handleChange} /></label>
              <div className="button-row">
                <button className="btnBack" onClick={prevStep}>Back</button>
                <button className="btnNext" onClick={handleSubmit}>Submit</button>
              </div>
          </section>
        </>
      }   
    </div>
  );
}

export default App;
