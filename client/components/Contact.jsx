import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Contact = () => {
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        "username": "",
        "phone": "",
        "email": "",
        "message": ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/contact/contactForm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });
            if (response.status == 201 && response.ok == true) {
                alert("Form submitted successfully");
                navigate("/login");
            } else {
                alert("Something went wrong, please check for errors.");
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    return <>
        <div className="sub_page">
            <section className="book_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>
                            Book A Table
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form_container">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <input type="text" name="username" className="form-control"
                                            value={contact.username}
                                            onChange={handleChange}
                                            placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <input type="text" name="phone" className="form-control"
                                            value={contact.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number" />
                                    </div>
                                    <div>
                                        <input type="email" name="email" className="form-control"
                                            value={contact.email}
                                            onChange={handleChange}
                                            placeholder="Your Email" />
                                    </div>
                                    <div>
                                        <textarea type="text" name="message" className="form-control"
                                            value={contact.message}
                                            onChange={handleChange}
                                            placeholder="Your message here" />
                                    </div>
                                    <div className="btn_box">
                                        <button type="submit">
                                            Contact Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="map_container ">
                                <div id="googleMap"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default Contact;