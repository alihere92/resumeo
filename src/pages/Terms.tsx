import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Resumeo, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Resumeo is a professional resume and cover letter builder that helps users create, customize, and manage 
                  job-ready documents. Our service includes templates, AI-powered content suggestions, and export functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  To access certain features of our service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Privacy and Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. We collect and process your personal information in accordance with our 
                  Privacy Policy. By using our service, you consent to the collection and use of information as outlined 
                  in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The content you create using Resumeo belongs to you. However, you grant us a license to store, process, 
                  and display your content as necessary to provide our services. Our templates, software, and other 
                  materials remain our intellectual property.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You agree not to use Resumeo for any unlawful purpose or any purpose prohibited under this clause. 
                  Prohibited uses include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Creating false or misleading resume content</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using our service to spam or send unsolicited communications</li>
                  <li>Violating any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Service Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or discontinue our service at any time, with or without notice. 
                  We shall not be liable to you or any third party for any modification, suspension, or discontinuance 
                  of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Resumeo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                  resulting from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at support@resumeo.com.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;