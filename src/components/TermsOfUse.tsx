import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import useStore from '../store/useStore';

export default function TermsOfUse() {
  const navigate = useNavigate();
  const startAssessment = useStore(state => state.startAssessment);

  const handleAgree = () => {
    startAssessment();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-[#1e3a8a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-4 text-center text-white">
        <img 
          src="/sst-logo.svg" 
          alt="SST Logo" 
          className="h-14 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold mb-3">
          Digital Threat Assessment® Toolkit
        </h1>
        <p className="text-lg mb-8 text-white/90">
          A comprehensive tool for conducting digital threat assessments and analyzing online behavior patterns.
        </p>

        <div className="bg-[#0f172a] rounded-2xl p-8 text-left shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Terms of Use and Legal Disclaimer</h2>

          <div className="bg-white rounded-xl text-gray-900 p-8 mb-8">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">Introduction</h3>
                <p className="mb-4 leading-relaxed">This Digital Threat Assessment® Toolkit (the "Toolkit") is provided for use by authorized professionals in the field of threat assessment and school safety.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>By using this Toolkit, you acknowledge that you have read and understood these Terms of Use</li>
                  <li>You agree to be bound by all terms and conditions contained herein</li>
                  <li>If you do not agree with these terms, you must not use this Toolkit</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Authorized Use</h3>
                <p className="mb-4 leading-relaxed">This Toolkit is intended for use by trained professionals only.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Users must have completed appropriate training and certification</li>
                  <li>Unauthorized use or distribution is strictly prohibited</li>
                  <li>Access credentials must not be shared with unauthorized individuals</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Privacy and Data Protection</h3>
                <p className="mb-4 leading-relaxed">Users are responsible for ensuring compliance with all applicable privacy laws and regulations when using this Toolkit.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>All data must be handled in accordance with relevant data protection standards</li>
                  <li>Personal information must be protected and secured at all times</li>
                  <li>Data retention policies must be followed</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Disclaimer of Warranties</h3>
                <p className="mb-4 leading-relaxed">This Toolkit is provided "as is" without any warranties, expressed or implied.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">Important Notice</h3>
                <p className="mb-4 leading-relaxed">We do not warrant that the Toolkit will meet your requirements or that its operation will be uninterrupted or error-free.</p>
              </section>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button 
              onClick={handleAgree}
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-10 h-14 rounded-full text-lg font-semibold transition-all transform hover:scale-105 active:scale-100 shadow-lg hover:shadow-xl"
            >
              Agree and Proceed
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              By clicking "Agree and Proceed", you acknowledge that you have read and agree to the terms above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
