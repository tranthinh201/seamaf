import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailContact: React.FC = () => {
  const [contact, setContact] = useState<Contact | null>();
  const { id } = useParams();

  const getDetailContact = async () => {
    try {
      const res = await axios.get(
        `https://thinh-201-pain-epu-backend.onrender.com/api/v1/contact/${id}`
      );

      const { data } = res.data;
      setContact(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailContact();
  }, []);

  return (
    <div className="container m-auto">
      <div className="py-5">
        <Link to={"/admin/contact"}>Back To Contact</Link>
      </div>
      <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <main className="mt-8">
          <h2 className="text-gray-700 dark:text-gray-200">Web paint,</h2>
        </main>

        <footer className="mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            This contact was sent to {""}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
            >
              {contact && contact.email}
            </a>
            <br />
            <p className="text-gray-500 dark:text-gray-400">
              Subject: {contact && contact.subject}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Message: {contact && contact.message}
            </p>
          </p>
          <br />
          <br />
          <span className="mt-3 text-gray-500 dark:text-gray-400 flex">
            © 2023 Website create by:{" "}
            <p className="text-blue-600">Thinh Tran</p>
          </span>
        </footer>
      </section>
    </div>
  );
};

export { DetailContact };
