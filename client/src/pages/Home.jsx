import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-white rounded-2xl shadow-sm border p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Trusted Home Healthcare Services
            </p>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
              Elderly Care & Nursing Assistance{" "}
              <span className="text-blue-600">at Home</span>
            </h1>

            <p className="text-gray-600 mt-4">
              Book verified nurses, caregivers, attendants, and physiotherapists for
              safe and reliable elderly care services at your doorstep.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/register"
                className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 border rounded-xl font-medium hover:bg-gray-100"
              >
                Book a Service
              </Link>
            </div>

            <div className="flex gap-6 mt-6 text-sm text-gray-600">
              <div>
                <p className="font-bold text-black">✔ Verified Staff</p>
                <p>Background checked</p>
              </div>
              <div>
                <p className="font-bold text-black">✔ Easy Booking</p>
                <p>In a few clicks</p>
              </div>
              <div>
                <p className="font-bold text-black">✔ Safe Care</p>
                <p>Home-based support</p>
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="bg-blue-50 rounded-2xl p-6 border">
            <h2 className="text-xl font-bold">Popular Services</h2>
            <p className="text-gray-600 text-sm mt-1">
              Choose the care type that best suits your needs.
            </p>

            <div className="grid gap-4 mt-5">
              <ServiceMiniCard
                title="Nursing Care"
                desc="Vitals monitoring, injections & post-surgery care."
              />
              <ServiceMiniCard
                title="Elderly Attendant"
                desc="Daily assistance, companionship and hygiene support."
              />
              <ServiceMiniCard
                title="Physiotherapy"
                desc="Recovery & mobility sessions at home."
              />
              <ServiceMiniCard
                title="Post-Hospital Care"
                desc="Long-term assistance after discharge."
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">How It Works</h2>
        <p className="text-gray-600 mt-1">
          Simple process for families to book verified caregivers.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-5">
          <StepCard step="1" title="Register / Login" desc="Create your account easily." />
          <StepCard step="2" title="Add Patient Profile" desc="Enter elderly care details." />
          <StepCard step="3" title="Book a Service" desc="Choose service & schedule time." />
          <StepCard step="4" title="Care Delivered" desc="Track service & share feedback." />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mt-10 bg-white rounded-2xl border shadow-sm p-6 md:p-10">
        <h2 className="text-2xl font-bold">Why Choose SeniorCare Connect?</h2>
        <p className="text-gray-600 mt-1">
          Built for safety, reliability, and stress-free home healthcare.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <FeatureCard
            title="Verified Caregivers"
            desc="Admin verification ensures only trusted caregivers onboard."
          />
          <FeatureCard
            title="Transparent Pricing"
            desc="Service pricing is visible before booking — no hidden charges."
          />
          <FeatureCard
            title="Service Tracking"
            desc="Track booking status from request to completion."
          />
          <FeatureCard
            title="Care Notes"
            desc="Caregivers can add patient notes and vitals updates."
          />
          <FeatureCard
            title="Ratings & Reviews"
            desc="Give feedback after service and build trust for others."
          />
          <FeatureCard
            title="Multi-City Ready"
            desc="Designed to support expansion into multiple regions."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 text-center py-10">
        <h2 className="text-3xl font-bold">Ready to book elderly care services?</h2>
        <p className="text-gray-600 mt-2">
          Start now and connect with verified healthcare professionals.
        </p>

        <Link
          to="/register"
          className="inline-block mt-5 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:opacity-90"
        >
          Create Account
        </Link>
      </section>
    </Layout>
  );
}

/* ✅ Small Components */
function ServiceMiniCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl border p-4 hover:shadow-sm transition">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
        {step}
      </div>
      <h3 className="font-semibold mt-3">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-gray-50 rounded-2xl border p-5 hover:bg-white transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  );
}
