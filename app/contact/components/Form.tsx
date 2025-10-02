'use client';

import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

const Form = () => {
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({
          user_name: parsed.user_name || '',
          user_email: parsed.user_email || '',
          subject: parsed.subject || '',
          message: parsed.message || '',
        });
      } catch (e) {
        console.error('Eroare la citirea datelor salvate:', e);
      }
    }

    const savedTerms = localStorage.getItem('acceptedTerms');
    if (savedTerms === 'true') {
      setAcceptedTerms(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleCheckboxChange = () => {
    const updatedTerms = !acceptedTerms;
    setAcceptedTerms(updatedTerms);
    localStorage.setItem('acceptedTerms', String(updatedTerms));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (!acceptedTerms) {
      alert('Trebuie să accepți termenii și condițiile.');
      return;
    }

    if (form.current) {
      try {
        await emailjs.sendForm(
          'service_dn4lo48',
          'template_dsvwnc7',
          form.current,
          'j5nju8AhbjXa7habB'
        );

        setSuccess(true);
        localStorage.removeItem('formData');
        localStorage.removeItem('acceptedTerms');

        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: '',
        });
        setAcceptedTerms(false);
      } catch (err) {
        console.error('❌ Eroare la trimitere:', err);
        setError(true);
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Contactează-ne</h2>
      <p className="text-center text-gray-600 mb-8">
        Trimite-ne un mesaj și îți vom răspunde în cel mai scurt timp posibil.
      </p>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <input
          type="text"
          name="user_name"
          placeholder="Nume"
          value={formData.user_name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subiect"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="message"
          placeholder="Mesajul tău"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={handleCheckboxChange}
            className="accent-blue-600"
          />
          <span className="text-sm text-gray-700">
            Sunt de acord cu{' '}
            <Link href="/termeni-si-conditii" className="text-blue-600 hover:underline">
              termenii și condițiile
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={!acceptedTerms}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          Trimite mesajul
        </button>

        {success && <p className="text-green-600 text-center">✅ Mesaj trimis cu succes!</p>}
        {error && <p className="text-red-600 text-center">❌ A apărut o eroare la trimitere.</p>}
      </form>
    </div>
  );
};

export default Form;
