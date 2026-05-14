import { useState } from "react";
import { FaInstagram, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // remove error on typing
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-14 px-6">

      {/* SEO */}
      <Helmet>
        <title>Contact Us - Velvyana</title>
        <meta name="description" content="Contact Velvyana for support." />
        <meta name="keywords" content="contact velvyana, support" />
      </Helmet>

      {/* SUCCESS */}
      {submitted && (
        <div className="fixed top-6 right-6 bg-green-500 px-5 py-3 rounded-lg shadow-lg z-50">
          Message Sent ✓
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

        {/* LEFT */}
        <div className="w-full md:w-[40%] text-gray-300 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">
              Visit Our Workspace
            </h2>
            <p className="font-semibold text-white">Velvyana</p>
            <p>Lucknow, India</p>
          </div>

          <div>
            <a href="tel:+919064252616" className="flex gap-3 mb-2 hover:text-pink-500">
              <FaPhoneAlt /> +91 90642 52616
            </a>
            <a href="mailto:info@velvyana.com" className="flex gap-3 hover:text-pink-500">
              <MdEmail /> info@velvyana.com
            </a>
          </div>

          <div>
            <a href="#" className="flex gap-3 mb-2 hover:text-pink-500">
              <FaInstagram /> @velvyanaofficial
            </a>
            <a href="#" className="flex gap-3 hover:text-pink-500">
              <FaFacebook /> @velvyanaofficial
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[60%]">

          <h2 className="text-xl mb-6">Contact Form</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full p-3 rounded-lg bg-gray-800 border ${
                  errors.name ? "border-pink-600" : "border-gray-700"
                }`}
              />
              {errors.name && (
                <p className="text-pink-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className={`w-full p-3 rounded-lg bg-gray-800 border ${
                  errors.email ? "border-pink-600" : "border-gray-700"
                }`}
              />
              {errors.email && (
                <p className="text-pink-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* SUBJECT */}
            <div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={`w-full p-3 rounded-lg bg-gray-800 border ${
                  errors.subject ? "border-pink-600" : "border-gray-700"
                }`}
              />
              {errors.subject && (
                <p className="text-pink-600 text-sm mt-1">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="5"
                className={`w-full p-3 rounded-lg bg-gray-800 border ${
                  errors.message ? "border-pink-600" : "border-gray-700"
                }`}
              />
              {errors.message && (
                <p className="text-pink-600 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button className="w-full bg-pink-500 py-3 rounded-lg hover:bg-pink-600">
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto mt-14">
        <iframe
          title="location"
          src="https://www.google.com/maps?q=Lucknow&output=embed"
          className="w-full h-[300px] rounded-xl"
        ></iframe>
      </div>

    </div>
  );
};

export default Contact;