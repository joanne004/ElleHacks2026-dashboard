import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.css";
import { useAuth } from "../../../context/AuthContext";
// import Navbar from "../../../components/Navbar/Navbar.jsx";
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

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
import resume from "../../../assets/ApplicationForm/resume-banner.png";
import file from "../../../assets/ApplicationForm/add-file.png";
import gears from "../../../assets/ApplicationForm/gears.png";
import event from "../../../assets/ApplicationForm/event-banner.png";
import hats from "../../../assets/ApplicationForm/party-hats.png";
import questions from "../../../assets/ApplicationForm/questions-banner.png";
import cord from "../../../assets/ApplicationForm/cord.png";
import mouse from "../../../assets/ApplicationForm/mouse.png";
import final from "../../../assets/ApplicationForm/final-banner.png";
import girl from "../../../assets/ApplicationForm/girl-laptop.png";

function App() {

  const { user, submitForm, getForm, resumeURL } = useAuth();
  const [agreement, setAgreement] = useState(() => {
    const saved = localStorage.getItem("agreement");
    return saved === "true";
  });

  const savedData = JSON.parse(localStorage.getItem("formData")) || {
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
    attendedElleHacksBefore: null,
    yorkStudentNumber: "",
    resumeUrl: "",
    shareWithSponsors: null,
    linkedin: "",
    github: "",
    dietaryRestrictions: [],
    otherDietary: "",
    tshirtSize: "",
    whyElleHacks: "",
    goals: "",
    projectStory: "",
    confirmInPerson: false,
    overnightStay: null,
    agreeCodeOfConduct: false,
    agreeMLHPrivacy: false,
    agreeMLHComms: null,
    accessibilityRequests: "",
    status: "draft",
  };

  const [formData, setFormData] = useState(savedData);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return agreement === true;
      case 2:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.pronouns &&
          formData.email &&
          formData.phone &&
          formData.ageOnEvent
        );
      case 3:
        return (
          formData.country &&
          formData.province &&
          formData.disability &&
          formData.indigenousIdentity &&
          formData.ethnicity.length > 0
        );
      case 4:
        return (
          formData.levelOfStudy &&
          formData.school &&
          formData.graduationYear &&
          formData.fieldOfStudy &&
          formData.hackathonsAttended &&
          (formData.attendedElleHacksBefore !== null)
        );
      case 5:
        return true;
      case 6:
        return (
          formData.resumeUrl && 
          (formData.shareWithSponsors !== null)
        );
      case 7:
        return (
          (formData.tshirtSize !== "") && 
          formData.dietaryRestrictions.length > 0
        );
      case 8:
        return (
          formData.whyElleHacks && 
          formData.goals && 
          formData.projectStory
        );
      case 9:
        return (
          formData.confirmInPerson && 
          (formData.overnightStay !== null) && 
          formData.agreeCodeOfConduct && 
          formData.agreeMLHPrivacy 
        );
      default:
        return false;
    }
  };

  const [step, setStep] = useState(parseInt(localStorage.getItem("step")) || 1);
  const prevStep = () => {
    setStep((prev) => {
      const prevStep = Math.max(prev - 1, 1);
      localStorage.setItem("step", prevStep);
      return prevStep;
    });
  };
  const nextStep = () => {
    if (isStepValid()) {
      setStep((prev) => {
        const next = Math.min(prev + 1, 10);
        localStorage.setItem("step", next);
        return next;
      });
    }
  };

  const handleChange = (e) => {  // Handle form input changes
    const { name, value, type, checked } = e.target;

    const checkboxes = ["ethnicity", "dietaryRestrictions"]; // Handle checkbox groups as arrays

    if (type === "checkbox" && checkboxes.includes(name)) {
      const newValues = checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value);
      
    setFormData((prev) => {
        const updated = {...prev, [name]: newValues};
        localStorage.setItem("formData", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    // For agreeMLHComms
    if (type === "checkbox") {
      setFormData(prev => {
        const updated = { ...prev, [name]: checked };
        localStorage.setItem("formData", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    let newValue = value;
    if (type == "radio" || name == "agreeMLHComms") {
      if (value === "true") newValue = true;
      if (value === "false") newValue = false;
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue }; // Normal inputs
      localStorage.setItem("formData", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData, status: "submitted" };

    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    
    try {
      await submitForm(user.id, updatedData); 
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
    nextStep();
  };  

useEffect(() => {
  const fetchApplication = async () => {
    try {
      const res = await getForm(user.id);
      setAgreement(true);
      localStorage.setItem("agreement", "true");
      setFormData(res.data);

      if (res.data.status !== 'draft') {
        setStep(10);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error(error);
        alert("Failed to load application");
      }
    }
  };

  if (user?.id) {
    fetchApplication();
  }
}, [user.id]);

  return (
    <div className="App">
      <Sidebar data={formData} />
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
            <p>
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
            <p><strong>I understand that ElleHacks is
              an event for marginalized gender groups. Preference will be given
              to these groups when selecting accepted hackers.*</strong></p>
            <label><input type="radio" name="agreement" value="true" checked={agreement} onChange={() => {setAgreement(true); localStorage.setItem("agreement", "true")}} required />Yes, I understand.</label>
            <img src={headphones} alt="Headphones" className="decor headphones" />
            <div className="button-row">
              <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
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
              <label>Phone Number*<input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></label>
              <label>What will be your age as of January 23, 2026?*<input type="number" name="ageOnEvent" value={formData.ageOnEvent} onChange={handleChange} min="13" required /></label>
            </div>
            <div className="button-row">
              <button className="btnBack" onClick={prevStep}>Back</button>
              <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
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

                <div className="agreement">
                  According to the Accessible Canada Act, disability means "any impairment, 
                  including a physical, mental, intellectual, cognitive, learning, communication or sensory impairment—or 
                  a functional limitation—whether permanent, temporary or episodic in nature, or evident or not, that in 
                  interaction with a barrier, hinders a person’s full and equal participation in society".
                </div>

                <div className="radio-block">
                  <p><strong>Do you identify as a person with a disability as described in the Accessible Canada Act?</strong></p>
                </div>
                <div className="radio-group">
                  <label><input type="radio" name="disability" value="Yes" checked={formData.disability === "Yes"} onChange={handleChange} />Yes</label>
                  <label><input type="radio" name="disability" value="No" checked={formData.disability === "No"} onChange={handleChange} />No</label>
                  <label><input type="radio" name="disability" value="Prefer not to answer" checked={formData.disability === "Prefer not to answer"} onChange={handleChange} />Prefer not to answer</label>
                </div>

                <div className="radio-block">
                  <p><strong>Do you identify as First Nations, Inuit, and/or Métis?</strong></p>
                </div>
                <div className="radio-group">
                  <label><input type="radio" name="indigenousIdentity" value="Yes" checked={formData.indigenousIdentity === "Yes"} onChange={handleChange} />Yes</label>
                  <label><input type="radio" name="indigenousIdentity" value="No" checked={formData.indigenousIdentity === "No"} onChange={handleChange} />No</label>
                  <label><input type="radio" name="indigenousIdentity" value="Prefer not to answer" checked={formData.indigenousIdentity === "Prefer not to answer"}  onChange={handleChange} />Prefer not to answer</label>
                </div>

                <p><strong>Which of the following ethnic or racial categories best describes how you self-identity? Select all that apply.</strong></p>
                <div className="checkbox-grid">
                  <label><input type="checkbox" name="ethnicity" value="Black" checked={formData.ethnicity.includes("Black")} onChange={handleChange} />Black [African, African-Canadian, Afro-Caribbean descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="East Asian" checked={formData.ethnicity.includes("East Asian")} onChange={handleChange} />East Asian [Chinese, Japanese, Korean, Taiwanese descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Indigenous" checked={formData.ethnicity.includes("Indigenous")} onChange={handleChange} />Indigenous [First Nations, Inuk/Inuit, Métis]</label>
                  <label><input type="checkbox" name="ethnicity" value="Latin American" checked={formData.ethnicity.includes("Latin American")} onChange={handleChange} />Latin American [Hispanic or Latin American descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Middle Eastern" checked={formData.ethnicity.includes("Middle Eastern")} onChange={handleChange} />Middle Eastern [Arab, Persian, West Asian descent (e.g. Afghan, Egyptian, Iranian, Kurdish, Lebanese, Turkish)]</label>
                  <label><input type="checkbox" name="ethnicity" value="South Asian" checked={formData.ethnicity.includes("South Asian")} onChange={handleChange} />South Asian [South Asian descent (e.g., Bangladeshi, Indian, Indo-Caribbean, Pakistani, Sri Lankan)]</label>
                  <label><input type="checkbox" name="ethnicity" value="Southeast Asian" checked={formData.ethnicity.includes("Southeast Asian")} onChange={handleChange} />Southeast Asian [Cambodian, Filipino, Indonesian, Thai, Vietnamese, or other Southeast Asian descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Caucasian" checked={formData.ethnicity.includes("Caucasian")} onChange={handleChange} />Caucasian [European descent]</label>
                  <label><input type="checkbox" name="ethnicity" value="Prefer not to answer" checked={formData.ethnicity.includes("Prefer not to answer")} onChange={handleChange} />Prefer not to answer</label>
                  <label>
                    <input type="checkbox" id="other" name="ethnicity" value="Other" checked={formData.ethnicity.includes("Other")} onChange={handleChange} />
                    Other: <input type="text" id="otherText" name="otherEthnicity" value={formData.otherEthnicity} onChange={handleChange} />
                  </label>
                </div>

                <div className="button-row">
                  <button className="btnBack" onClick={prevStep}>Back</button>
                  <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
                </div>
            </section>
        </>
      }
          
      {step === 4 &&
        <>
          {/* Education & Interests Section */}
          <div className="section-header york-section">
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
                    <label><input type="radio" name="attendedElleHacksBefore" value="true" checked={formData.attendedElleHacksBefore === true} onChange={handleChange} />Yes</label>
                    <label><input type="radio" name="attendedElleHacksBefore" value="false" checked={formData.attendedElleHacksBefore === false} onChange={handleChange} />No</label>
                  </div>
              </label>

              <div className="button-row">
                <button className="btnBack" onClick={prevStep}>Back</button>
                <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
              </div>
          </section>
        </>  
      }
          
      {step === 5 &&
        <> 
          {/* YorkU Student Section */}
          <div className="section-header york-header">
            <img src={york} alt="YorkU banner" className="section-banner"/>
            <h2>YorkU Students Only</h2>  
            <img src={flask} alt="Flask" className="decor flask" />
          </div>
          <section className="form-section">
              <label>Please enter your Student Number below<input type="text" placeholder="" name="yorkStudentNumber" value={formData.yorkStudentNumber} onChange={handleChange} /></label>
              <div className="button-row">
                <button className="btnBack" onClick={prevStep}>Back</button>
                <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
              </div>
          </section>
        </>
      }   

      { step === 6 &&
        <>
          {/* Resume Section */}
          <div className="section-header resume-header">
            <img src={resume} alt="Resume banner" className="section-banner" />
            <h2>Resume and Professional Links</h2>
          </div>
          <section className="form-section">
            <b>Upload your resume here, named in the following format*</b>
            <p>LastName_FirstName.pdf</p><p className="italics">Example: Doe_Jane.pdf</p>
            <label htmlFor="fileUpload" className="fileUpload"><img src={file} alt="Folder" className="file" /></label>
            <input 
              type="file"
              id="fileUpload" 
              name="resumeUrl" 
              accept="application/pdf" 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    resumeUrl: file
                }));
                }
              }}
              style={{ display: "none" }} required />
              {formData.resumeUrl && (() => {
              const raw = formData.resumeUrl;
              const filename =
                typeof raw === "string"
                ? raw.split("/").pop().split("-").slice(1).join("-")
                : raw.name;
                return <p className="pt-4">{filename}</p>;
            })()}
            <br /><br />
            <b>Can we share your resume & form responses with our sponsors for recruitment opportunities?</b>
            <br />
            <div className="radio-group">
              <div className="checkbox-grid">
                <label><input type="radio" name="shareWithSponsors" value="true" checked={formData.shareWithSponsors === true} onChange={handleChange} />Yes, you can share this information with sponsors.</label>
                <label><input type="radio" name="shareWithSponsors" value="false" checked={formData.shareWithSponsors === false} onChange={handleChange} />No, you cannot share this information with sponsors.</label>
              </div>
              <img src={gears} alt="Gears" className="gears" />
            </div>
            <br />
            <label><b>If you have a LinkedIn / Portfolio Link, you can provide the link here</b><input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} /></label>
            <br />
            <label><b>If you have a GitHub account, you can provide the link here</b><input type="text" name="github" value={formData.github} onChange={handleChange} /></label>
            <div className="button-row">
              <button className="btnBack" onClick={prevStep}>Back</button>
              <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
            </div>
          </section>
        </>
      }

      { step === 7 && 
        <>
          {/* Logistics Section */}
          <div className="section-header event-header">
            <img src={event} alt="Event banner" className="section-banner" />
            <h2>Event Logistics</h2>
          </div>
          <section className="form-section">
            <br />
            <b>Dietary Restrictions*</b>
            <p className="italics">If you have any allergies, please specify under 'Other'</p>
            <br />
            <div className="checkbox-grid">
              <label><input type="checkbox" name="dietaryRestrictions" value="No" checked={formData.dietaryRestrictions.includes("No")} onChange={handleChange} />No, I do not have any dietary restrictions</label>
              <label><input type="checkbox" name="dietaryRestrictions" value="Halal" checked={formData.dietaryRestrictions.includes("Halal")} onChange={handleChange} />Halal</label>
              <label><input type="checkbox" name="dietaryRestrictions" value="Vegan" checked={formData.dietaryRestrictions.includes("Vegan")} onChange={handleChange} />Vegan (includes vegetarian & kosher)</label>
              <label><input type="checkbox" name="dietaryRestrictions" value="Gluten-Free" checked={formData.dietaryRestrictions.includes("Gluten-Free")} onChange={handleChange} />Gluten-Free</label>
              <label><input type="checkbox" name="dietaryRestrictions" value="Dairy-Free" checked={formData.dietaryRestrictions.includes("Dairy-Free")} onChange={handleChange} />Dairy-Free</label>
              <label><input type="checkbox" name="dietaryRestrictions" value="Allergies" checked={formData.dietaryRestrictions.includes("Allergies")} onChange={handleChange} />Allergies</label>
              <label>
                <input type="checkbox" id="other" name="dietaryRestrictions" value="Other" checked={formData.dietaryRestrictions.includes("Other")} onChange={handleChange} />
                Other: <input type="text" id="otherText" name="otherDietary" value={formData.otherDietary} onChange={handleChange} />
              </label>
            </div>
            <br /><br />
            <b>T-Shirt Size (unisex)*</b>
            <br />
            <div className="radio-group">
              <div className="checkbox-grid">
                <label><input type="radio" name="tshirtSize" value="XS" checked={formData.tshirtSize === "XS"} onChange={handleChange} />XS</label>
                <label><input type="radio" name="tshirtSize" value="S" checked={formData.tshirtSize === "S"} onChange={handleChange} />S</label>
                <label><input type="radio" name="tshirtSize" value="M" checked={formData.tshirtSize === "M"} onChange={handleChange} />M</label>
                <label><input type="radio" name="tshirtSize" value="L" checked={formData.tshirtSize === "L"} onChange={handleChange} />L</label>
                <label><input type="radio" name="tshirtSize" value="XL" checked={formData.tshirtSize === "XL"} onChange={handleChange} />XL</label>
              </div>
              <img src={hats} alt="Hats" className="hats" />
            </div>
            <div className="button-row">
              <button className="btnBack" onClick={prevStep}>Back</button>
              <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
            </div>
          </section>
        </>
      }
          
      { step === 8 && 
        <>
          {/* Questions Section */}
          <div className="section-header questions-header">
            <img src={questions} alt="Questions banner" className="section-banner" />
            <h2>Questions</h2>
          </div>
          <section className="form-section questions-section">
            <br /><br />
            <b>Why are you interested in participating in ElleHacks 2026?*</b>
            <br /><br /><br />
            <textarea id="whyElleHacks" name="whyElleHacks" value={formData.whyElleHacks} onChange={handleChange} rows="9" style={{width: "100%"}}/>
             <br /><br /><br/>
            <b>What do you hope to achieve during the hackathon?*</b>
            <br /><br /><br />
            <textarea id="whyElleHacks" name="goals" value={formData.goals} onChange={handleChange} rows="9" style={{width: "100%"}}/>
            <br /><br /><br/>
            <b>Tell us about a project/assignment you worked on that you're proud of, 
              or one that totally broke and taught you something anyway.*</b>
            <br /><br /><br />
            <textarea id="whyElleHacks" name="projectStory" value={formData.projectStory} onChange={handleChange} rows="9" style={{width: "100%"}}/>
            <img src={cord} alt="Mouse Cord" className="cord" />
            <img src={mouse} alt="Mouse" className="mouse" />
            <div className="button-row">
              <button className="btnBack" onClick={prevStep}>Back</button>
              <button className="btnNext" onClick={nextStep} disabled={!isStepValid()}>Next</button>
            </div>
          </section>
        </>
      }
          
      { step === 9 && 
        <>
          {/* Final Section */}
          <div className="section-header">
            <img src={final} alt="Final banner" className="section-banner" />
            <h2>Final Section</h2>
          </div>
          <section className="form-section">
            <br />
            <b>Please confirm that you understand ElleHacks 2026 is an in-person event, taking place at York University</b>
            <br />
            <p>(4700 Keele St, Toronto, ON, Canada, M3J 1P3)<b>*</b></p>
            <div className="radio-group">
              <label><input type="radio" name="confirmInPerson" value="true" checked={formData.confirmInPerson === true} onChange={handleChange} />I am able to attend ElleHacks in-person at York University.</label>
            </div>
            <br /><br /><br />
            <b>Will you require overnight accommendations at ElleHacks?</b> (ie. a quiet place to sleep)<b>*</b>
            <div className="checkbox-grid">
              <label><input type="radio" name="overnightStay" value="true" checked={formData.overnightStay === true} onChange={handleChange} />Yes, I will be staying overnight for some or all of ElleHacks.</label>
              <label><input type="radio" name="overnightStay" value="false" checked={formData.overnightStay === false} onChange={handleChange} />No, I will not be staying overnight for ElleHacks. I will commute to and from the event each day.</label>
            </div>
            <br /><br /><br/>
            <b>I have read and agree to the <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">MLH Code of Conduct</a>.*</b>
            <div className="radio-group">
              <label><input type="radio" name="agreeCodeOfConduct" value="true" checked={formData.agreeCodeOfConduct === true} onChange={handleChange} />I have read and agreed to the MLH Code of Conduct.</label>
            </div>
            <br /><br /><br/>
            <b>
              I authorize you to share my application/registration information with Major League Hacking for event administration, ranking and 
              MLH administration in-line with the <a href="https://www.mlh.com/privacy">MLH Privacy Policy</a>. I further agree to the terms of both 
              the <a href="https://github.com/MLH/mlh-policies/tree/main/prize-terms-and-conditions">MLH Contest Terms and Conditions</a> and the 
              <a href="https://www.mlh.com/privacy">MLH Privacy Policy</a>.
            </b>
            <div className="radio-group">
              <label><input type="radio" name="agreeMLHPrivacy" value="true" checked={formData.agreeMLHPrivacy === true} onChange={handleChange} />I agree.</label>
            </div>
            <br /><br /><br/>
            <b>I authorize MLH to send me occasional emails about relevant events, career opportunities, and community annoucements.</b> [OPTIONAL]
            <div className="checkbox-grid">
              <label><input type="checkbox" name="agreeMLHComms" checked={formData.agreeMLHComms} onChange={handleChange} />I agree.</label>
            </div>
            <br /><br />
            <b>... and we're done! Anything else you'd like to let us know?</b>
            <p className="italics">If you have any accessibility requests or concerns, please let us know here.</p>
            <br />
            <textarea id="requests" name="accessibilityRequests" value={formData.accessibilityRequests} onChange={handleChange} rows="10" style={{width: "100%"}}/>
              <img src={girl} alt="Girl Laptop" className="girl" />
              <div className="button-row">
                <button className="btnBack" onClick={prevStep}>Back</button>
                <button className="btnNext" onClick={handleSubmit} disabled={!isStepValid()}>Submit</button>
              </div>
          </section>
        </>
      }

      {step === 10 &&
      <>
        <section className="status-page">
          <p>Hooray! Your application has been submitted. Your current status is: <b>{formData.status}</b>.</p> 
          <p>Check back anytime to follow your application’s progress.</p>
        </section> 
      </>
      }

    </div>
  );
}

export default App;
