import banner from "../assets/banner/banner.jpeg";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div className="bg-[#020617] min-h-screen pb-20 text-gray-200">

      {/* ✅ SEO */}
      <Helmet>
        <title>Privacy Policy - Velvyana</title>
        <meta
          name="description"
          content="Read Velvyana's privacy policy to understand how we collect, use, and protect your personal data."
        />
        <meta
          name="keywords"
          content="privacy policy, velvyana privacy, data protection"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* HERO */}
      <div className="relative h-[280px] md:h-[380px] w-full">
        <img
          src={banner}
          alt="privacy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest">
            PRIVACY POLICY
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-6 mt-10 flex justify-center">
        <div className="max-w-4xl w-full bg-[#0f172a] text-gray-300 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 leading-relaxed text-sm md:text-base whitespace-pre-line">

{`Introduction
This Privacy Policy describes how VELVYANA and its affiliates (collectively "VELVYANA, we, our, us") collect, use, share, protect or otherwise process your information/ personal data through our website https://velvyana.com/ (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.

Collection-We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship.and related information provided from time to time. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email IDand/or any such information shared as proof of identity or address. Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s) You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform. We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis. We will also collect your information related to your transactions on Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner’s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information. If you receive an email, a call from a person/association claiming to be VELVYANA seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.

Usage- We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information. You understand that your access to these products/services may be affected in the event permission is not provided to us.

Sharing- We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment opted by you. These disclosure may be required for us to provide you access to our services and products offered to you, to comply with our legal obligations, to enforce our user agreement, to facilitate our marketing and advertising activities, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process.

Security Precautions- To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. However, the transmission of information is not completely secure.

Data Deletion and Retention- You have an option to delete your account. We may retain data as required by law.

Your Rights- You may access, rectify, and update your personal data directly.

Consent- By visiting our Platform, you consent to the collection and use of your data.

Changes to this Privacy Policy- We may update this Privacy Policy from time to time.`}

        </div>
      </div>

    </div>
  );
};

export default Privacy;