import { Card, Badge } from "flowbite-react";
import React from "react";

export default function Tandc() {
  return (
    <>
      <Card className=' justify-center m-5'>
        <Badge
          color='success'
          className='text-5xl p-3'
        >
          Terms and Conditions
        </Badge>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Gaurav's Blog ("Blog"). These Terms and Conditions
          ("Terms") govern your access to and use of the Blog, which is operated
          by [Your Name] ("we," "us," or "our").
        </p>
        <p>
          By accessing or using the Blog, you agree to be bound by these Terms.
          If you disagree with any part of the Terms, then you may not access or
          use the Blog.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          You may or may not be required to create an account to access the
          Blog. If you do create an account, you are responsible for maintaining
          the confidentiality of your account information, including your
          password. You further agree to accept responsibility for all
          activities or actions that occur under your account.
        </p>

        <h2>3. User Content</h2>
        <p>
          The Blog may allow you to submit comments, reviews, or other content
          ("User Content"). You retain all ownership rights to your User
          Content. However, by submitting User Content, you grant us a
          non-exclusive, worldwide, royalty-free license to use, reproduce,
          modify, publish, translate, distribute, and display such User Content
          on the Blog and on other platforms we may use.
        </p>
        <p>
          You represent and warrant that you own all rights or have obtained all
          necessary licenses and permissions to your User Content, and that your
          User Content does not infringe on the intellectual property rights or
          other rights of any third party.
        </p>

        <h2>4. Prohibited Activities</h2>
        <p>
          You agree not to use the Blog for any unlawful purpose or in a manner
          that could damage, disable, overburden, or impair the Blog or its
          servers, or interfere with any other user's enjoyment of the Blog.
        </p>
        <p>Here are some examples of prohibited activities:</p>
        <ul>
          <li>
            Uploading content that is defamatory, harassing, obscene, hateful,
            or discriminatory.
          </li>
          <li>Violating any applicable laws or regulations.</li>
          <li>Infringing on the intellectual property rights of others.</li>
          <li>Transmitting any viruses or other harmful code.</li>
          <li>
            Disrupting or interfering with the Blog's servers or networks.
          </li>
          <li>
            Using the Blog for commercial purposes without our express written
            consent.
          </li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          The content on the Blog, including text, graphics, logos, images, and
          software, is the property of [Your Name] or its licensors and is
          protected by copyright, trademark, and other intellectual property
          laws. You may not modify, publish, transmit, reverse engineer,
          participate in the transfer or sale of, create derivative works from,
          or exploit in any way any of the content, in whole or in part, without
          our prior written consent.
        </p>

        <h2>6. Disclaimer</h2>
        <p>
          The Blog is provided "as is" and "as available." We make no
          warranties, express or implied, regarding the accuracy, completeness,
          reliability, or availability of the Blog or its content.
        </p>
        <p>
          To the extent permitted by applicable law, we disclaim all warranties,
          express or implied, including warranties of merchantability, fitness
          for a particular purpose, and non-infringement.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          In no event will we be liable for any direct, indirect, incidental,
          special, consequential, or punitive damages arising out of or in
          connection with your use of the Blog.
        </p>
        <p>
          This includes, but is not limited to, damages for loss of profits,
          data, goodwill, or other intangible losses.
        </p>

        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless [Your Name], its officers,
          directors, employees, agents, and licensors from and against any and
          all claims, demands, losses, liabilities, costs, or expenses,
          including reasonable attorneys' fees, arising out of or in connection
          with your use of the Blog or your violation of these Terms.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may terminate your access to the Blog at any time, for any reason,
          without notice. We may also remove or edit any User Content at any
          time.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms will be governed by and construed in accordance with the
          laws of [Your State or Jurisdiction], without regard to its conflict
          of law provisions.
        </p>

        <h2>11. Dispute Resolution</h2>
        <p>
          Any dispute arising out of or relating to these Terms will be resolved
          by binding arbitration in accordance with the rules of the American
          Arbitration Association ("AAA"). The arbitration will be held in [Your
          City or County], [Your State or Jurisdiction]. You and we agree that
          the arbitrator may award any relief permitted by law or equity,
          regardless of whether such relief is available in court.
        </p>

        <h2>12. Changes to the Terms</h2>
        <p>
          We may revise these Terms at any time by posting the revised Terms on
          the Blog. You are expected to check this page regularly so you are
          aware of any changes, as they are binding on you.
        </p>
      </Card>
    </>
  );
}
