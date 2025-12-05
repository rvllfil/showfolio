"use client";

interface ContactSectionProps {
  profileData: any;
}

export function ContactSection({ profileData }: ContactSectionProps) {
  const handleContactClick = () => {
    console.log("Contact clicked");
  };

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold mb-6 shadow-lg">
              ✉
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Quick Response
                </h4>
                <p className="text-slate-600 text-sm">
                  Usually within 24 hours
                </p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Free Consultation
                </h4>
                <p className="text-slate-600 text-sm">No commitment required</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Ready to Start Your Project?
              </h3>
              <p className="text-xs text-slate-500">
                Let&apos;s discuss your ideas and see how we can bring them to
                life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleContactClick}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
                <button
                  onClick={handleContactClick}
                  className="px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:border-slate-400 transition-colors shadow-md hover:shadow-lg"
                >
                  Schedule Call
                </button>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              {profileData?.socialLinks?.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md"
                >
                  <span className="font-semibold">
                    {link.platform?.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
